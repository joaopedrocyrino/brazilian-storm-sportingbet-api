import Gateway from '../gateway'
import { IRoute } from '../../dto'

import MatchesServices from '../../services/matches'

const getResults: IRoute = {
  route: '/match/results',
  method: 'GET',
  handler: new Gateway({
    service: MatchesServices.results
  })
}

export default [
  getResults
]