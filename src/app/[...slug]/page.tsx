import fs from 'fs'

export default function Post({ params }) {
  const a = fs.readdirSync('docs')
  return (
    <div>
      {params.slug.join('/')}
      <br/>
      {a.join(', ')}
    </div>
  )
}