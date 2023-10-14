CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"from" timestamp NOT NULL,
	"to" timestamp NOT NULL,
	title text NOT NULL,
	author uuid NOT NULL
);

CREATE TABLE public.authors (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	address varchar NOT NULL,
	"name" varchar NOT NULL
);

ALTER TABLE public.events ADD CONSTRAINT events_fk FOREIGN KEY (author) REFERENCES public.authors(id);