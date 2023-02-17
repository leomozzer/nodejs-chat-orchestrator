import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Messages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    chatId: string

    @Column()
    origin: string

    @Column()
    text: string

    @CreateDateColumn()
    createdAt: Date;
}