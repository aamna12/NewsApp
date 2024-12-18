import React from 'react'

const NewsItem=(props)=>  {

    let {title,description,imageURL,newsURL,author,date,source}=props;
    return (
      <div className='my-4'>
        <div className="card">
          <div style={{display:"flex",
            justifyContent:"flex-end",
            position:"absolute",
            right:"0"   
          }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
    {source}
  </span>
  </div>
  <img src={imageURL} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}
      </h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">Last updated by <span>{author}</span> on <span>{date}</span></small></p>
    <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-dark mt-auto">Read More</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItem
