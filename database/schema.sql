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
	"userId" integer NOT NULL,
	"cartItemsId" integer NOT NULL,
	"cartId" integer NOT NULL,
	"totalCost" integer NOT NULL,
	"skuId" TEXT NOT NULL,
	"size" TEXT NOT NULL,
	"cartCount" serial NOT NULL,
	"purchasedTime" timestamp with time zone NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."shoes" (
	"skuId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"price" integer NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"brand" TEXT NOT NULL,
	CONSTRAINT "shoes_pk" PRIMARY KEY ("skuId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."inventory" (
	"inventoryId" serial NOT NULL,
	"size" TEXT NOT NULL,
	"skuId" TEXT NOT NULL,
	CONSTRAINT "inventory_pk" PRIMARY KEY ("inventoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cartItems" (
	"cartItemsId" serial NOT NULL,
	"skuId" TEXT NOT NULL,
	"size" TEXT NOT NULL,
	"cartCount" serial NOT NULL,
	"cartId" serial NOT NULL,
	"inventoryId" integer NOT NULL,
	CONSTRAINT "cartItems_pk" PRIMARY KEY ("cartItemsId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cart" (
	"cartId" serial NOT NULL,
	"purchased" BOOLEAN NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."usersAddress" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"address2" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zipCode" TEXT NOT NULL,
	CONSTRAINT "usersAddress_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("cartItemsId") REFERENCES "cartItems"("cartItemsId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk2" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
-- ALTER TABLE "orders" ADD CONSTRAINT "orders_fk3" FOREIGN KEY ("cartCount") REFERENCES "cartItems"("cartCount");


ALTER TABLE "inventory" ADD CONSTRAINT "inventory_fk0" FOREIGN KEY ("skuId") REFERENCES "shoes"("skuId");

ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("skuId") REFERENCES "shoes"("skuId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk1" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk2" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("inventoryId");

ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "usersAddress" ADD CONSTRAINT "usersAddress_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
