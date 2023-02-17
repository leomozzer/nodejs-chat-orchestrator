import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    chatId: string

    @Column('boolean', { default: true })
    active: boolean = true;

    @CreateDateColumn()
    joinedAt: Date;

    @CreateDateColumn({ 'nullable': true })
    leftAt: Date;
}