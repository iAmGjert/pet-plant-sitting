import React, {useState, useEffect, useContext} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Modal } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { search, setHistory, newSearch } from '../../state/features/info/infoSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import axios from 'axios';
import moment from 'moment';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import Test from './test';
import { ThemeContext } from '../../App';

const Search = () => {
  const theme = useContext(ThemeContext);
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
    setSearchTarget(e.target.textContent);
    getInfo();
    dispatch(setHistory(prevSearch));
  };
  const [wikiView, setWikiView] = useState(false);
  const [clickedArticle, setClickedArticle] = useState({});
  const [articleInfo, setArticleInfo] = useState({});
  const getArticle = async () => {
    if (clickedArticle.pageid === undefined) {
      return;
    }
    const data = await axios.get(`/api/info/wiki/article/${clickedArticle.pageid}`);
  };
  useEffect(()=>{
    if (clickedArticle.title === undefined) {
      return;
    }
    axios.get(`/api/info/wiki/article/${clickedArticle.title}`)
      .then((data)=>{
        setArticleInfo(data.data.query.pages[clickedArticle.pageid]);
        return data;
      })
      .catch((err)=>{ console.error(err); });
  }, [clickedArticle]);

  const viewArticleButton = (article)=>{
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
            <Button className='bootstrap-button' disabled={!click} size='lg' onClick={ ()=>{ handleClick(); } } type='button'>Search</Button>
          </Col>
          <Col>
            <Button className='bootstrap-button' disabled onClick={ ()=>{ handleClick(); } } type='button'><img alt='' src='https://www.svgrepo.com/show/281155/cloud-computing-upload.svg' style={{height: 35}} /></Button>
          </Col>
        </Row>
      </Form>
      <Card className='bootstrap-card'>
        <Row>
          <Card.Title>
            Most Recent Search: { prevSearch }
          </Card.Title>
        </Row>
        {
          info.searchinfo && info.searchinfo.suggestion && info.searchinfo.suggestion.length > 1 ?
            <Row>
              <Card.Body>
                  Did you mean {<Button className='bootstrap-button' variant='outline-secondary' onClick={(e)=>{ didYouMean(e); }}>{info.searchinfo.suggestion}</Button>}?
              </Card.Body>
            </Row> :
            <Row/>

        }
      </Card>
      {
        info.search && info.search.length > 0 ?
          info.search.map((article, idx)=>{
            return <Card className='bootstrap-card' key={`article${idx}`}>
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
             
              <Button className='bootstrap-button' onClick={()=>{ viewArticleButton(article); }}>View Summary</Button>
            </Card>; 
          }) :
          <div/>
      }
      <Modal contentClassName={theme === 'dark' && 'dark'} show={wikiView} fullscreen='md-down' onHide={() => setWikiView(false)}>
        <Modal.Header closeButton className={theme === 'dark' && 'btn-close-white'}>
          <Modal.Title>{articleInfo.title}</Modal.Title>
        </Modal.Header>
        {
          <Modal.Body>
            {articleInfo.extract}
          </Modal.Body>
        }
        <Modal.Footer>
          Click <a href={`http://en.wikipedia.org/wiki?curid=${articleInfo.pageid}`} target="_blank" rel="noopener noreferrer" className={theme === 'dark' && 'modal-button-as-link'}>here</a> to open the full Wikipedia article.
        </Modal.Footer>
      </Modal>
      
    </Container>  
  );
};

Search.propTypes = {};

export default Search;
