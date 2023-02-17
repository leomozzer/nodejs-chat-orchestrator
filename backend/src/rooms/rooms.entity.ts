import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Rooms {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('boolean', { default: true })
    active: boolean = true;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}