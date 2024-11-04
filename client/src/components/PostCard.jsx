import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    } else {
      return content;
    }
  };

  return (
    <div className='group relative w-full border border-custom-color h-[420px] overflow-hidden rounded-lg sm:w-[430px] shadow-xl'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[200px] w-full object-cover'
        />
      </Link>
      <div style={{
        display:'flex',justifyContent:'space-evenly',flexDirection:'column',width:'100%', height:"220px",padding:'10px'
      }}>
<div>
        <p className='text-xl text-custom-color font-semibold line-clamp-2'>{post.title}</p>
        </div>
        <div>
        <div
          className='text-base line-clamp-2'
          dangerouslySetInnerHTML={{ __html: truncateContent(post.content, 600) }}
        ></div>
        <span className='italic text-xs opacity-60'>#{post.subcategory}</span>
        </div>
       <div>
        <Link to={`/post/${post.slug}`} className='text-custom-color opacity-60 hover:underline'>
        Lire la suite
        </Link>
        </div>
      </div>
    </div>
  );
}
