const { User, PetPlant, Job, JobApplicant, JobPetsPlants } = require('../../database/index');
import axios from 'axios';

import express, { Request, Response } from 'express';
const info = express();



info.get('/wiki/:searchTarget', async (req: Request, res: Response) => {
  let url = 'https://en.wikipedia.org/w/api.php'; 
  const params: any = {
    action: 'query',
    list: 'search',
    srsearch: req.params.searchTarget,
    format: 'json'
  };
  
  url = url + '?origin=*';
  Object.keys(params).forEach(function(key: any) { url += '&' + key + '=' + params[key]; });
  const search = await axios.get(url);
  return res.status(200).send(search.data);
    
});
info.get('/wiki/article/:title', async (req: Request, res: Response) => {
  let url = 'https://en.wikipedia.org/w/api.php'; 
  const params: any = {
    action: 'query',
    format: 'json',
    prop: 'revisions',
    titles: req.params.title,
    formatversion: '2',
    rvprop: 'content',
    rvslots: '*'
  };
  
  url = url + '?origin=*';
  Object.keys(params).forEach(function(key: any) { url += '&' + key + '=' + params[key]; });
  const article = await axios.get(url);
  return res.status(200).send(article.data);
    
});


module.exports = info;
