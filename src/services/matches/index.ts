import Services from '../'
import { RoundModel, TeamModel } from '../../data/models'
import { resultsValidator } from './validator'
import { BadRequestError } from '../../errors'

class MatchesServices extends Services {
    async results({ token, ...req}: {
        season: number,
        house: string,
        visitor: string,
        token: any
    }): Promise<{
        statusCode: number
        body: {
            house: number,
            visitor: number
        }
    }> {
        const { error } = resultsValidator.validate(req)
        if (error) {
            console.log(error)
            throw new BadRequestError()
        }

        // await this.check({
        //     req,
        //     schema: resultsValidator,
        // })

        const houseTeam = await TeamModel.findOne({ acro: req.house });
        if (!houseTeam) { throw new BadRequestError() }

        const visitorTeam = await TeamModel.findOne({ acro: req.visitor })
        if (!visitorTeam) { throw new BadRequestError() }

        const round = await RoundModel.findOne({ houseId: houseTeam.id, visitorId: visitorTeam.id, season: req.season });
        if (!round) { throw new BadRequestError() }

        return { body: { house: round.houseGoals, visitor: round.visitorGoals }, statusCode: 200 }
    };
};

export default new MatchesServices()
