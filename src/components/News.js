import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{

  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);
  
  
 

    const updateNews=async()=>{
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef68db6f0e42412d85e2c0841165b669&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      props.setProgress(30);
      let data=await fetch(url);
      let parsedData=await data.json()
      props.setProgress(50);
      setArticles(parsedData.articles)
      setLoading(false)
      setTotalResults(parsedData.totalResults)
      props.setProgress(100);     
    };

    useEffect(() => {
      document.title=`${props.category.charAt(0).toUpperCase()}${props.category.slice(1)} - NewsMonkey`;
      updateNews();
      // eslint-disable-next-line
    }, [])

    {/*const handleNextButton=async()=>{
      setPage(page+1);
      updateNews();
    }*/}

   {/*const handlePreviousButton=async()=>{
    setPage(page-1);
      updateNews();
    }*/}

  const timeDate=(str)=>{
    const a=new Date(str)
    const s=a.toGMTString()
    return s

  };

  const fetchMoreData = async() => {
    
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef68db6f0e42412d85e2c0841165b669&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
      let data=await fetch(url);
      let parsedData=await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      

  };
  

    return (
     <>
        <h2 className='my-8'><center>{`NewsMonkey - Top HeadLines from ${props.category.charAt(0).toUpperCase()}${props.category.slice(1)}`}</center></h2>
      {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
 >
        <div className='container'>
        <div className='row my-3'>
            {articles.map((element,index)=>{
                return <div className='col md-4' key={index}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
                imageURL={element.urlToImage?element.urlToImage:"https://euaa.europa.eu/sites/default/files/styles/width_600px/public/default_images/news-default-big.png?itok=NNXAZZTc"} 
                newsURL={element.url} author={element.author?element.author:"Anonymous"} date={timeDate(element.publishedAt)}
                source={element.source.name}/>
            </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/*<div className='container d-flex justify-content-between'>
          <button type="button" class="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePreviousButton}>&larr; Previous</button>
          <button type="button" class="btn btn-dark" disabled={this.state.articles.length<this.props.pageSize} onClick={this.handleNextButton}>Next &rarr;</button>
        </div>*/}
    </>
    )
  
}

News.defaultProps={
  county:"us",
  pageSize:4,
  category:"general"
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News
