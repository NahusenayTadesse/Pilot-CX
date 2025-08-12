import { mysqlTable,  int, varchar, datetime, text, timestamp } from 'drizzle-orm/mysql-core';


export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
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

export const footerForm = mysqlTable('footer_form', {
	id: int('id').autoincrement().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull()
})


export const quotes = mysqlTable('quotes', {
  id: int('id').primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),  
  numberOfTeams: int('number_of_teams'),
  ticketsPerWeek: int('tickets_per_week'),
  existingTeam: varchar('existing_team', {length: 50}),
  startDate: timestamp('start_at'),
  details: text('details').notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});
 
export const replies = mysqlTable('replies', {
  id: int('id').primaryKey().autoincrement(),
  quoteId: int('quote_id').notNull().references(() => quotes.id, { onDelete: 'CASCADE' }),
  adminName: varchar('admin_name', { length: 255 }).notNull(),
  replyMessage: text('reply_message').notNull(),
  sentAt: timestamp('sent_at').defaultNow().notNull(),
});





export type Quotes =  typeof quotes.$inferInsert;

export type ContactForm = typeof contactForm.$inferSelect;



export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
