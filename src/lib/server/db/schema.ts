import { mysqlTable,  int, varchar, datetime, text, timestamp, decimal } from 'drizzle-orm/mysql-core';


export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	username: varchar('username', { length: 32 }).notNull().unique(),
	email: varchar('email', {length: 50}).notNull().default('hello@pilotcx.com'),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 }).notNull().references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});
	
  


export const quotes = mysqlTable('quotes', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  service: varchar('service', { length: 50 }).notNull(),
  budget: decimal('budget', { precision: 12, scale: 2 }),
  timeline: varchar('timeline', { length: 100 }),
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
