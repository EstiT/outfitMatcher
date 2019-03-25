var User        = require('../models/user');
var Category    = require('../models/categories');
var Department  = require('../models/department');
var Product     = require('../models/product');
var Variant     = require('../models/variant');
var mongoose    = require('mongoose');
var colour      = require('colour');


//mongoose.connect('mongodb://localhost/shoppingApp');
mongoose.connect('mongodb://localhost/yardAndGarage', { useNewUrlParser: true, useCreateIndex: true, });

function deleteVariants(callback)
{
    Variant.deleteMany({}, function(e, result)
    {
        if (e)
        {
            console.log("Failed on deleting variants from db\nError:".error, e.message.error + "\n")
        }
        else
        {
            console.log("Variants deleted".red)
            callback()
        }
    });
}
function deleteCategories(callback)
{
    Category.deleteMany({}, function(e, result)
    {
        if (e)
        {
            console.log("Failed on deleting category from db\nError:".error, e.message.error + "\n")
        }
        else
        {
            console.log("Categories deleted".red)
            callback()
        }
    });
}
function deleteDepartments(callback)
{
    Department.deleteMany({}, function(e, result)
    {
        if (e)
        {
            console.log("Failed on deleting department from db\nError:".error, e.message.error + "\n")
        }
        else
        {
            console.log("Departments deleted".red)
            callback()
        }
    });
}

function deleteUsers(callback)
{
    User.deleteMany({}, function(e, result)
    {
        if (e)
        {
            console.log("Failed on deleting user from db\nError:".error, e.message.error + "\n")
        }
        else
        {
            console.log("Users deleted".red)
            callback()
        }
    });
}
function deleteProducts(callback)
{
    Product.deleteMany({}, function(e, result)
    {
        if (e)
        {
            console.log("Failed on deleting product from db\nError:".error, e.message.error + "\n")
        }
        else
        {
            console.log("Products deleted".red)
            callback()
        }
    });
}

function insertCategories(callback)
{
    var categories =
    [
        new Category({
            categoryName        : 'Basics'
        }),
        new Category({
            categoryName        : 'Blazer'
        }),
        new Category({
            categoryName        : 'Knitwear'
        }),
        new Category({
            categoryName        : 'Jeans'
        }),
        new Category({
            categoryName        : 'Jackets'
        }),
        new Category({
            categoryName        : 'Dresses'
        }),
        new Category({
            categoryName        : 'Mens Tops'
        }),
        new Category({
            categoryName        : 'Mens Pants'
        }),
        new Category({
            categoryName        : 'Womens Tops'
        }),
        new Category({
            categoryName        : 'Womens Pants'
        })
    ]

    for (let i = 0; i < categories.length; i++){
        categories[i].save(function(e, r) {
            if (i === categories.length - 1){
                console.log("Categories inserted".green)
                callback();
            }
        });
    }
}

function insertDepartments(callback)
{
    var departments =
    [
        new Department({
            departmentName      : 'Women',
            categories          : 'Basics,Blazer,Dresses,Womens Tops,Womens Pants'

        }),
        new Department({
            departmentName      : 'Men',
            categories          : 'Knitwear,Jeans,Jackets,Mens Tops,Mens Pants'
        })
    ]

    for (let i = 0; i < departments.length; i++){
        departments[i].save(function(e, r) {
            if (i === departments.length - 1){
                console.log("Departments inserted".green)
                callback();
            }
        });
    }
}

function insertProducts(callback)
{
    var products =
    [
        new Product({
            _id: "5bedf31cc14d7822b39d9d43",
            imagePath: `/uploads/7568644802_1_1_1.jpg`,
            title: 'Oversized Textured Top',
            description: 'High collar top with short cuffed sleeves. Asymmetric hem with side slits.',
            color: 'Gray',
            department: 'Women',
            category: 'Basics'
        }),
        new Product({
            _id: "5bedf3b9c14d7822b39d9d45",
            imagePath: `/uploads/5644641800_2_5_1.jpg`,
            title: 'Tank Top',
            description: 'Flowy V-neck camisole with spaghetti straps.',
            color: 'Black',
            department: 'Women',
            category: 'Basics'
        }),
        new Product({
            _id: "5bedf448c14d7822b39d9d47",
            imagePath: `/uploads/7568469251_2_1_1.jpg`,
            title: 'Basic Top',
            description: 'Round neck long sleeved shirt. ',
            color: 'White',
            department: 'Women',
            category: 'Basics'
        }),
        new Product({
            _id: "5bedf55bc14d7822b39d9d4b",
            imagePath: `/uploads/8197757093_2_2_1.jpg`,
            title: 'Belted Plaid Blazer',
            description: 'Flowy blazer with lapel collar and long sleeves. Self belt. Chest patch pockets and welt pockets at hip. Front double-breasted button closure.',
            color: 'Black',
            department: 'Women',
            category: 'Blazer'
        }),
        new Product({
            _id: "5bedf5eec14d7822b39d9d4e",
            imagePath: `/uploads/1775300615_1_1_1.jpg`,
            title: 'Perl Knit Swear',
            description: 'Purl-stitch knit sweater in a combination of textures. Ribbed trim.',
            color: 'Orange',
            department: 'Men',
            category: 'Knitwear'
        }),
        new Product({
            _id: "5bedf6b5c14d7822b39d9d51",
            imagePath: `/uploads/6186352407_2_1_1.jpg`,
            title: 'Ripped Jeans',
            description: 'Slim fit jeans with five pockets, washed effect, and rips on the legs. Zippered hem at in-seams. Front zip and metal button closure.',
            color: 'Dark Blue',
            department: 'Men',
            category: 'Jeans'
        }),
        new Product({
            _id: "5bedf720c14d7822b39d9d52",
            imagePath: `/uploads/5575380406_1_1_1.jpg`,
            title: 'Basic Slim Jeans',
            description: 'Basic slim-fit jeans with five pockets. Two side pockets, two back pockets, and one coin pocket. Belt loops. Front hidden zipper and button closure.',
            color: 'Light Blue',
            department: 'Men',
            category: 'Jeans'
        }),
        new Product({
            _id: "5bedf7ecc14d7822b39d9d55",
            imagePath: `/uploads/3548350700_2_1_1.jpg`,
            title: 'Faux Leather Perforated Jacket',
            description: 'Faux leather perforated jacket with high collar and long sleeves. Two front zip pockets. Lined. Interior pocket. Front zip closure. Ribbed elastic hem and cuffs.',
            color: 'Brown',
            department: 'Men',
            category: 'Jackets'
        }),
        new Product({
            _id: "5c9958192e31bdf4758bc975",
            imagePath: `/uploads/product1-1.png`,
            title: 'Sophisticated Turtleneck Sweater',
            description: 'Soft white sweter with delicate wrist details',
            color: 'White',
            department: 'Women',
            category: 'Womens Tops'
        }),
        new Product({
            _id: "5c995869ab8e97f486e79174",
            imagePath: `/uploads/10.png`,
            title: 'T-Shirt Wrap Dress',
            description: 'Burnt orange t-shirt wrap dress. Comfortable and flatering office wear.',
            color: 'Orange',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c995869ab8e97f486e79175",
            imagePath: `/uploads/11.png`,
            title: 'Button Down Smock',
            description: 'Oversized rustic artists smock.',
            color: 'Beige',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c995896ec223ef48fc670f0",
            imagePath: `/uploads/12.png`,
            title: 'Flowy Babydoll Dress',
            description: 'White sleeveless and pleated babydoll dress.',
            color: 'White',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c995896ec223ef48fc670f1",
            imagePath: `/uploads/13.png`,
            title: 'Cut out Animal Print Dress',
            description: 'Polo collar, open back animal print dress. Curved bottom cut',
            color: 'Black',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c995896ec223ef48fc670f2",
            imagePath: `/uploads/20.png`,
            title: 'Animal Print Button Down',
            description: 'Retro chic with shoulder pads and cuff details.',
            color: 'Cream',
            department: 'Women',
            category: 'Womens Tops'
        }),
        new Product({
            _id: "5c9958c4955057f4978a42f2",
            imagePath: `/uploads/21.png`,
            title: 'Not Your Boyfriends Button Down',
            description: 'Striped oversized blouse with sash detail around the waist.',
            color: 'Black',
            department: 'Women',
            category: 'Womens Tops'
        }),
        new Product({
            _id: "5c9958c4955057f4978a42f3",
            imagePath: `/uploads/22.png`,
            title: 'Wrap Genie Bouse',
            description: 'Elegant mid cut long sleeve wrapped blouse. Elastics around the wrists',
            color: 'White',
            department: 'Women',
            category: 'Womens Tops'
        }),
        new Product({
            _id: "5c9958c4955057f4978a42f4",
            imagePath: `/uploads/30.png`,
            title: 'Tweed Dress Pants',
            description: 'High waisted with a large belt. Large pockets and clean cut creases.',
            color: 'Beige',
            department: 'Women',
            category: 'Womens Pants'
        }),
        new Product({
            _id: "5c9958f5ba93caf49fe1889a",
            imagePath: `/uploads/31.png`,
            title: 'Retro Leggings',
            description: 'Splashed with gold and white. 3/4 leggings.',
            color: 'Black',
            department: 'Women',
            category: 'Womens Pants'
        }),
        new Product({
            _id: "5c9958f5ba93caf49fe1889b",
            imagePath: `/uploads/32.png`,
            title: 'Dress Pants',
            description: 'High waisted.',
            color: 'Black',
            department: 'Women',
            category: 'Womens Pants'
        }),
        new Product({
            _id: "5c9958f5ba93caf49fe1889c",
            imagePath: `/uploads/33.png`,
            title: 'Statement 7/8ths Trousers',
            description: 'Bold constrasting buttons and thick sash.',
            color: 'White',
            department: 'Women',
            category: 'Womens Pants'
        }),
        new Product({
            _id: "5c995921303c4bf4aa9d1e3a",
            imagePath: `/uploads/40.png`,
            title: 'Anchor Tee',
            description: 'Crew neck t-shirt with an anchor pattern.',
            color: 'Navy Blue',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c995921303c4bf4aa9d1e3b",
            imagePath: `/uploads/41.png`,
            title: 'Classic Tee',
            description: 'White crew neck basic.',
            color: 'White',
            department: 'Men',
            category: 'Basics'
        }),
        new Product({
            _id: "5c995921303c4bf4aa9d1e3c",
            imagePath: `/uploads/42.png`,
            title: 'Graphic Tee',
            description: 'New York state of mind.',
            color: 'Black',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b53",
            imagePath: `/uploads/43.png`,
            title: 'Vacation Tee',
            description: 'Back to sunnier times with this palm tree pattern.',
            color: 'Black',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b54",
            imagePath: `/uploads/50.png`,
            title: 'Classic Crew Sweater',
            description: 'Closet staple crew neck for Fall-Winter.',
            color: 'Navy Blue',
            department: 'Men',
            category: 'Knitwear'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b55",
            imagePath: `/uploads/51.png`,
            title: 'Red Sun Sweater',
            description: 'Red sun front and center. White text.',
            color: 'Navy Blue',
            department: 'Men',
            category: 'Knitwear'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b56",
            imagePath: `/uploads/52.png`,
            title: 'Cozy Graphic Pullover',
            description: 'Fitted graphic pullover with palm trees.',
            color: 'White',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b57",
            imagePath: `/uploads/53.png`,
            title: 'Sundown Pullover',
            description: 'Cozy graphic pullover.',
            color: 'Grey',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b58",
            imagePath: `/uploads/60.png`,
            title: 'Dress Pants',
            description: 'Midnight black dress pants.',
            color: 'Black',
            department: 'Men',
            category: 'Mens Pants'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b59",
            imagePath: `/uploads/61.png`,
            title: 'Dress Shirt',
            description: 'Classic white clean cut button down.',
            color: 'White',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b5a",
            imagePath: `/uploads/62.png`,
            title: 'Far From Average Day Jeans',
            description: 'Best denim blue full length.',
            color: 'Blue',
            department: 'Men',
            category: 'Jeans'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b5b",
            imagePath: `/uploads/70.png`,
            title: 'Joggers',
            description: 'Comfortable joggers with drawstring, knee detailing and cuffed ankles.',
            color: 'Beige',
            department: 'Men',
            category: 'Mens Pants'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b5c",
            imagePath: `/uploads/71.png`,
            title: 'Pants',
            description: 'Above ankle cut.',
            color: 'Black',
            department: 'Men',
            category: 'Mens Pants'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b5d",
            imagePath: `/uploads/72.png`,
            title: 'Dress Pants',
            description: 'Plaid meets office wear.',
            color: 'Grey',
            department: 'Men',
            category: 'Mens Pants'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b5e",
            imagePath: `/uploads/100.png`,
            title: 'Button Down Tee',
            description: 'Short sleeve button down meets old bowling shirt.',
            color: 'Black',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b5f",
            imagePath: `/uploads/101.png`,
            title: 'Sheer Button Down',
            description: 'Transparent white collared button down dress shirt.',
            color: 'White',
            department: 'Men',
            category: 'Mens Tops'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b60",
            imagePath: `/uploads/110.png`,
            title: 'Bridesmaids Full Length Dress',
            description: 'Floral bodice, ribbon sash and pleated skirt.',
            color: 'Baby Blue',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b61",
            imagePath: `/uploads/111.png`,
            title: 'Bridesmaids Deep V Dress',
            description: 'Full length, low cut flowy gown.',
            color: 'Dark Blue',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b62",
            imagePath: `/uploads/112.png`,
            title: 'Bridesmaids Shoulder Ruffle Gown',
            description: 'Soft shoulder details. Matching ruffles along bottom trim',
            color: 'Lavender',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b63",
            imagePath: `/uploads/113.png`,
            title: 'Bridesmaids Spaghetti Strap Staple',
            description: 'Turn heads with this long black number.',
            color: 'Black',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b64",
            imagePath: `/uploads/120.png`,
            title: 'Polkadoted Mini Dress',
            description: 'Tied shoulder detail and buttons in the front.',
            color: 'Salmon',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b65",
            imagePath: `/uploads/121.png`,
            title: 'Denim Mini Dress',
            description: 'Buttons down the front. Large pockets.',
            color: 'Denim',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b66",
            imagePath: `/uploads/122.png`,
            title: 'Striped Long Sleeve Dress',
            description: 'Mini ruffled along neckline and bottom hem.',
            color: 'Beige',
            department: 'Women',
            category: 'Dresses'
        }),
        new Product({
            _id: "5c99599d18f04ef4bc4e6b67",
            imagePath: `/uploads/123.png`,
            title: 'Oversized Animal Print Dress',
            description: 'Long sleeved flowey dress.',
            color: 'Beige',
            department: 'Women',
            category: 'Dresses'
        })
    ];

    for (let i = 0; i < products.length; i++){
        products[i].save(function(e, r) {
            if (i === products.length - 1){
                console.log( products.length + "Products inserted".green)
                callback();
            }
        });
    }
}

function insertVariants(callback)
{
    var variants =
    [
        new Variant({
            productID: '5bedf31cc14d7822b39d9d43',
            imagePath: `/uploads/7568644710_1_1_1.jpg`,
            color: 'Beige'
        }),
        new Variant({
            productID: '5bedf3b9c14d7822b39d9d45',
            imagePath: `/uploads/5644641735_2_5_1.jpg`,
            color: 'Copper'
        }),
        new Variant({
            productID: '5bedf448c14d7822b39d9d47',
            imagePath: `/uploads/7568469605_2_1_1.jpg`,
            color: 'Maroon'
        }),
        new Variant({
            productID: '5bedf448c14d7822b39d9d47',
            imagePath: `/uploads/7568469822_2_1_1.jpg`,
            color: 'Charcool'
        }),
        new Variant({
            productID: '5bedf5eec14d7822b39d9d4e',
            imagePath: `/uploads/1775300806_2_1_1.jpg`,
            color: 'Stone'
        }),
        new Variant({
            productID: '5bedf720c14d7822b39d9d52',
            imagePath: `/uploads/5575380407_1_1_1.jpg`,
            color: 'Dark Blue'
        }),
        new Variant({
            productID: '5c9958c4955057f4978a42f3',
            imagePath: `/uploads/23.png`,
            color: 'Moon Blue'
        }),
        new Variant({
            productID: '5c99599d18f04ef4bc4e6b5d',
            imagePath: `/uploads/73.png`,
            color: 'Dark Grey'
        })
    ];

    for (let i = 0; i < variants.length; i++){
        variants[i].save(function(e, r) {
            if (i === variants.length - 1){
                console.log("Variants inserted".green)
                callback();
            }
        });
    }
}

function insertAdmin(callback)
{
    var newUser = new User({
        username    : 'admin@admin.com',
        password    : 'admin',
        fullname    : 'Cuneyt Celebican',
        admin       : true
    });
    User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log("Admin user inserted".green)
        console.log("Username: ", user.username + "\n" , "Password: admin");
        callback()
    });
}


function deleteDBEntitites(callback)
{
    deleteVariants(function()
    {
        deleteCategories(function()
        {
            deleteDepartments(function()
            {
                deleteUsers(function()
                {
                    deleteProducts(function()
                    {
                        insertCategories(function()
                        {
                            insertDepartments(function()
                            {
                                insertProducts(function()
                                {
                                    insertVariants(function()
                                    {
                                        insertAdmin(callback)
                                    })
                                })
                            })
                        })
                    });
                })
            })
        })
    })
}



deleteDBEntitites(exit)


function exit() {
    mongoose.disconnect();
}
