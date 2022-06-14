import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity('Points')
export default class PointsModel extends BaseEntity {
    @PrimaryColumn({ name: 'team_id' })
    teamId: string

    @Column()
    points: number

    constructor(init: Partial<PointsModel>) {
        super()
        Object.assign(this, init)
    }
}