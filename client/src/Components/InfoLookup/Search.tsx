import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Modal } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { search, setHistory, newSearch } from '../../state/features/info/infoSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import axios from 'axios';
import moment from 'moment';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import Test from './test';

const Search = () => {
  const navi = useNavigate();
  const dispatch = useAppDispatch();
  const [searchTarget, setSearchTarget] = useState('Fern');
  const [info, setInfo] = useState({});
  const [prevSearch, setPrevSearch] = useState('');

  const getInfo = async () => {
    if (searchTarget === '') {
      return;
    }
    const data = await axios.get(`/api/info/wiki/${searchTarget}`);
    setInfo(data.data.query);
    console.log(data.data.query);
    dispatch(search(data.data.query));
  };
  const handleClick = ()=>{
    setPrevSearch(searchTarget);
    getInfo();
    dispatch(setHistory(prevSearch));
    setSearchTarget('');
  };
  const [click, setClick] = useState(false);
  useEffect(()=>{
    if (searchTarget === '') {
      setClick(false);
      return;
    }
    setClick(true);
  }, [searchTarget]);
  
  const didYouMean = (e)=>{
    console.log(e.target.textContent);
    setSearchTarget(e.target.textContent);
    getInfo();
    dispatch(setHistory(prevSearch));
  };
  const [wikiView, setWikiView] = useState(false);
  const [clickedArticle, setClickedArticle] = useState({});
  const [articleInfo, setArticleInfo] = useState({});
  const getArticle = async () => {
    if (clickedArticle.pageid === undefined) {
      console.log('no page id');
      return;
    }
    const data = await axios.get(`/api/info/wiki/article/${clickedArticle.pageid}`);
    //setArticleInfo(data.parse);
    console.log(data.data.parse);
  };
  useEffect(()=>{
    if (clickedArticle.title === undefined) {
      console.log('no title in clicked article or first render');
      return;
    }
    axios.get(`/api/info/wiki/article/${clickedArticle.title}`)
      .then((data)=>{
        //console.log(data.data.query.pages[0].revisions[0].slots.main.content);
        setArticleInfo(data.data.query.pages[0]);
        return data;
      })
      .catch((err)=>{ console.error(err); });
    //setArticleInfo(data.parse);
    //console.log(data.data.parse);
  }, [clickedArticle]);

  const viewArticleButton = (article)=>{
    console.log('http://en.wikipedia.org/wiki?curid=' + article.pageid);
    setWikiView(!wikiView);
    setClickedArticle(article);
  };
  
  return (
    <Container>
      <Form>
        <Row>
          <Form.Group controlId='formSearch'>
            <Form.Control onKeyPress={(e)=>{ if (e.key === 'Enter') { e.preventDefault(); handleClick(); } }} type='search' placeholder='Octopus, Fern, Dog, etc...' onChange={ (e)=>{ setSearchTarget(e.target.value); }} value={searchTarget}/>
            <Form.Text className='text-muted'>
          Search Wikipedia or **COMING SOON** upload a photo to search!
            </Form.Text>
          </Form.Group>
            
        </Row>
        <Row>
          <Col>
            <Button disabled={!click} size='lg' onClick={ ()=>{ handleClick(); } } type='button'>Search</Button>
          </Col>
          <Col>
            <Button disabled onClick={ ()=>{ handleClick(); } } type='button'><img alt='' src='https://www.svgrepo.com/show/281155/cloud-computing-upload.svg' style={{height: 35}} /></Button>
          </Col>
        </Row>
      </Form>
      <Card>
        <Row>
          <Card.Title>
            Most Recent Search: { prevSearch }
          </Card.Title>
        </Row>
        {
          info.searchinfo && info.searchinfo.suggestion && info.searchinfo.suggestion.length > 1 && info.search[0].title !== 'Fern' ?
            <Row>
              <Card.Body>
                  Did you mean {<Button variant='outline-secondary' onClick={(e)=>{ didYouMean(e); }}>{info.searchinfo.suggestion}</Button>}?
              </Card.Body>
            </Row> :
            <Row/>

        }
      </Card>
      {
        info.search && info.search.length > 0 ?
          info.search.map((article, idx)=>{
            return <Card key={`article${idx}`}>
              <Card.Title>{article.title}</Card.Title>  
              <Card.Body>
                <Row>
                  <Col xs sm={1} md={1} lg={1}>
                    <Card.Title>
                      {'Words: ' + article.wordcount}
                    </Card.Title>
                  </Col>
                  <Col>        
                    <Card.Title>
                  Last Updated: {moment(article.timestamp).format('MM-DD-YYYY')}
                    </Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Body>
                      {
                        article.snippet.replace(/<[^>]*>?/gm, '')
                      }
                    </Card.Body>
                  </Col>
                </Row>
              </Card.Body>
             
              <Button onClick={()=>{ viewArticleButton(article); }}>View Article</Button>
            </Card>; 
          }) :
          <div/>
      }
      <Modal show={wikiView} fullscreen='md-down' onHide={() => setWikiView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{articleInfo.title} id:{articleInfo.pageid}</Modal.Title>
        </Modal.Header>
        {
          articleInfo && articleInfo.revisions && articleInfo.revisions.length > 0 &&
          <Modal.Body>
            //{articleInfo.revisions[0].slots.main.content.replace(/<[^>]*>?/gm, '')}
          </Modal.Body>
        }
      </Modal>
      
    </Container>  
  );
};

Search.propTypes = {};

export default Search;

/*
{
        info.query.search > 0 ? 
          info.map((ele, idx)=>{
            console.log('test');
            return <Card key={`art#${idx}`}>
              <Card.Title></Card.Title>  
              <Card.Body>
                <Row>
                  <Col xs sm={1} md={1} lg={1}>
                    <Card.Title>
                      {'Words: ' + 0}
                    </Card.Title>
                  </Col>
                  <Col>        
                    <Card.Title>
                    Insert Title Here
                    </Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Title>
                    Another Title
                    </Card.Title>
                  </Col>
                </Row>
              </Card.Body>
            </Card>; 
          }) :
          <div/>
      }
      */
