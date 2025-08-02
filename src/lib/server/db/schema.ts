import { mysqlTable,  int, varchar, datetime, text } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 }).notNull().references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const contactForm = mysqlTable('contact_form', {
	id: int('id').autoincrement().primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 20 }),
	service: varchar('service', { length: 100 }),
	message: text('message')
});



export type ContactForm = typeof contactForm.$inferSelect;



export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
