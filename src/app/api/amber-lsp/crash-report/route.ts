import { NextRequest, NextResponse } from 'next/server';
import { Issue as GithubIssue } from 'github-types'
import crypto from 'crypto';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER!;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME!;

const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues`;

type CrashReportBody = {
    logs: string;
    editor: string;
    os: string;
    lspVersion: string;
}

type Issue = Omit<GithubIssue, 'body'> & {
    body: string | null;
}

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return new NextResponse('Method Not Allowed', { status: 405 });
    }

    try {
        const { logs, editor, os, lspVersion } = await req.json() as CrashReportBody;

        if (!logs || !editor || !os || !lspVersion) {
            return NextResponse.json(
                { message: 'Invalid request body. Please provide logs, editor, os, and lspVersion.' },
                { status: 400 }
            );
        }

        const fingerprint = generateErrorFingerprint(logs);

        const foundIssue = await findIssueByFingerprint(fingerprint);

        if (foundIssue) {
            return createGitHubComment(foundIssue);
        }

        const { issueTitle, issueBody } = prepareIssue(logs, editor, os, lspVersion, fingerprint);

        const githubResponse = await fetch(GITHUB_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                title: issueTitle,
                body: issueBody,
                labels: ['bug', 'crash-report'],
            }),
        })

        if (githubResponse.ok) {
            const githubIssue = await githubResponse.json();
            return NextResponse.json(
                {
                message: 'Crash report received and GitHub issue created successfully!',
                issueUrl: githubIssue.html_url,
                },
                { status: 200 }
            );
        } else {
            const errorData = await githubResponse.json();
            return NextResponse.json(
                {
                message: 'Crash report received, but failed to create GitHub issue.',
                githubError: errorData,
                },
                { status: 500 }
            );
        }
    } catch (e) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

const createGitHubComment = async (issue: Issue) => {
    const commentUrl = `${GITHUB_API_URL}/${issue.number}/comments`;
    const commentBody = `
Another occurrence of this crash was reported at ${new Date().toISOString()}.
---
*Auto-reported by crash handler.*
`.trim();

    const commentResponse = await fetch(commentUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({ body: commentBody }),
    });

    if (commentResponse.ok) {
        return NextResponse.json({
            message: 'Crash report received and added as a comment to existing GitHub issue.',
            issueUrl: issue.html_url,
        }, { status: 200 });
    } else {
        const errorData = await commentResponse.json();
        console.error('Failed to add comment to GitHub issue:', commentResponse.status, errorData);

        return NextResponse.json({
            message: 'Crash report received, but failed to add comment to existing GitHub issue.',
            issueUrl: issue.html_url,
            githubApiError: errorData,
        }, { status: 200 });
    }
}

const prepareIssue = (logs: string, editor: string, os: string, lspVersion: string, fingerprint: string) => ({
    issueTitle: `Crash Report - ${editor} - ${os} - ${lspVersion} (Fingerprint: ${fingerprint.substring(0, 30)}...)`,
    issueBody: `
### Crash Report Details
**Editor:** ${editor}
**OS:** ${os}
**LSP Version:** ${lspVersion}
**DATE:** ${new Date().toISOString()}

---

**Logs:**
\`\`\`
${logs}
\`\`\`

---

**Fingerprint:** ${fingerprint}
This issue was automatically generated from a crash report submitted by the Amber LSP client.
`,
})

const generateErrorFingerprint = (logs: string): string => {
    const lines = logs.split('\n');

    const normalizedLines = lines
        // Remove timestamps and normalize the lines
        .map(line => line.replaceAll(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/g, '').trim())
        // Remove level prefixes (e.g., "ERROR:", "WARN:", etc.)
        .map(line => line.replaceAll(/(ERROR|WARN|INFO|DEBUG)/g, '').trim())
        // Remove busy timestamps (e.g., "time.busy=123ms")
        .map(line => line.replaceAll(/(time.busy=\d+(\.\d+)*(ms|µs|s)|time.idle=\d+(\.\d+)*(ms|µs|s))/g, '').trim())
        // Remove any identifiers
        .map(line => line.replaceAll(/FileId\(\d+\)/g, 'FileId').trim())
        .map(line => line.replaceAll(/FileVersion\(\d+\)/g, 'FileVersion').trim())
        // Filter out empty lines
        .filter(line => line.length > 0);

    // Join the normalized lines back into a single string
    const normalizedLogs = normalizedLines.join('\n');

    return crypto.createHash('sha256').update(normalizedLogs).digest('hex');
}

const findIssueByFingerprint = async (fingerprint: string): Promise<Issue | undefined> => {
    const searchUrl = `${GITHUB_API_URL}?state=open&q=${encodeURIComponent(`fingerprint:${fingerprint}`)}`;

    const response = await fetch(searchUrl, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!response.ok) {
      return
    }

    const existingIssues = await response.json() as Issue[];

    const foundIssue = existingIssues.find((issue: Issue) =>
        issue.title.includes(fingerprint) || issue.body?.includes(fingerprint)
    );

    return foundIssue;
}

