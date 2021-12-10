import axios, { AxiosResponse } from 'axios';
import { Router, Request, Response } from 'express';
import { Repo } from '../typings/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  try {
    const returnData: AxiosResponse<Repo[]> = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    const filteredData = returnData.data.filter((item) => !item.fork);
    res.status(200);
    res.json({ status: 200, data: filteredData });
  } catch (e) {
    res.status(400);
    res.json({ status: 400, message: 'Failed to fetch data.' });
  }
});
