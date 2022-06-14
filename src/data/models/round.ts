import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity('round')
export default class RoundModel extends BaseEntity {
    @PrimaryColumn({ name: 'house_id' })
    houseId: string

    @PrimaryColumn({ name: 'visitor_id' })
    visitorId: string

    @Column({ name: 'house_goals' })
    houseGoals: number

    @Column({ name: 'visitor_goals' })
    visitorGoals: number

    @Column()
    season: number

    constructor(init: Partial<RoundModel>) {
        super()
        Object.assign(this, init)
    }
}