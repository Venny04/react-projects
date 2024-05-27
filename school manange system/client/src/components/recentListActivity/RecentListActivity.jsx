import './recentListActivity.css'

const RecentListActivity = ({ components }) => {
  return (
    <article className='recent-list-activity'>
      {components?.map(() => (
        <div>Googe</div>
      ))}
    </article>
  )
}

export default RecentListActivity