set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderId" serial NOT NULL,
	"cartId" integer NOT NULL,
	"userId" integer NOT NULL,
	"totalCost" integer NOT NULL,
	"purchasedTime" timestamp with time zone NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."shoes" (
	"productId" integer NOT NULL,
	"sku" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"price" integer NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"brand" TEXT NOT NULL,
	CONSTRAINT "shoes_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."sizes" (
	"productId" integer NOT NULL,
	"size" NUMERIC NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cartItems" (
  "itemId" serial NOT NULL,
	"cartId" int NOT NULL UNIQUE,
	"productId" int NOT NULL ,
	"quantity" integer NOT NULL,
	"size" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cart" (
	"cartId" serial NOT NULL,
	"purchased" BOOLEAN NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."usersAddress" (
	"userId" integer NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"address2" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zipCode" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "sizes" ADD CONSTRAINT "sizes_fk0" FOREIGN KEY ("productId") REFERENCES "shoes"("productId");

ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk1" FOREIGN KEY ("productId") REFERENCES "shoes"("productId");


ALTER TABLE "usersAddress" ADD CONSTRAINT "usersAddress_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
