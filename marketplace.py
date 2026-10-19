
products = [
    {
        "id": 101,
        "name": "HP EliteBook 840 G5"
    }
]

sellers = [
    {"id": 1, "name": "Bilha"},
    {"id": 2, "name": "Chessa"}
]

listings = [
    {
        "seller_id": 1,
        "product_id": 101,
        "price": 25000
    },
    {
        "seller_id": 2,
        "product_id": 101,
        "price": 23500
    }
]

# Display every offer for our product
for listing in listings:
    if listing["product_id"] == 101:
        seller = next(
            s for s in sellers
            if s["id"] == listing["seller_id"]
        )

        print(seller["name"], "-", listing["price"])
