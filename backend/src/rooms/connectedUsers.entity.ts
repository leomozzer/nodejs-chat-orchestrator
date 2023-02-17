import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class ConnectedUsers {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    chatId: string

    @CreateDateColumn()
    joinedAt: Date;

    @CreateDateColumn()
    leftAt: Date;
}