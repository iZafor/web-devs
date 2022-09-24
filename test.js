db.products.insert(
    {
        _id: 2,
        name: "Pencil",
        price: .80,
        stock: 12,
        reviews: [
            {
                authorName: "Zafor",
                rating: 5,
                review: "Best rubber ever!"
            },
            {
                authorName: "Iqbal",
                rating: 5,
                review: "Awesome rubber!"
            }
        ]
    }
)

db.products.update(
    {
        _id: 2,
    },
    {
       $unset: {"reviews.0.1": ""}
    }
)
