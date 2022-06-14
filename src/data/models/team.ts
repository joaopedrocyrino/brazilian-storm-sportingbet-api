import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity('team')
export default class TeamModel extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column()
    acro: string

    @Column()
    name: string

    constructor(init: Partial<TeamModel>) {
        super()
        Object.assign(this, init)
    }
}