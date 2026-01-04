const MenuData = [
  {
    id: 'veg-biryani',
    name: 'Veg Biryanis',
    items: [
      { name: 'Paneer Tikka Biryani', price: 280, desc: 'Charcoal-grilled paneer tikka layered with saffron basmati.' },
      { name: 'Jackfruit Dum Biryani', price: 290, desc: 'Tender pulled jackfruit marinated in secret spices, slow-cooked.' },
      { name: 'Hyderabadi Veg Dum Biryani', price: 240, desc: 'Garden fresh vegetables infused with authentic Nizami spices.' },
      { name: 'Mushroom Malai Biryani', price: 260, desc: 'Earthy button mushrooms in a velvety white-spice marinade.' },
      { name: 'Soya Chaap Tikka Biryani', price: 270, desc: 'Protein-rich soya chunks smoked in a tandoor before dum.' },
      { name: 'Kashmiri Guchhi Biryani', price: 420, desc: 'Rare Himalayan morels slow-cooked with aromatic rice.' },
      { name: 'Kolkata Veg Biryani', price: 230, desc: 'Subtle spices, featuring the iconic slow-cooked potato and saffron.' },
      { name: 'Dry Fruit Zaffrani Pulao', price: 310, desc: 'Sweet and savory rice loaded with cashews, raisins, and almonds.' },
      { name: 'Corn and Spinach Biryani', price: 250, desc: 'Fresh corn kernels and spinach puree swirled with basmati.' },
      { name: 'Mixed Bean Dum Biryani', price: 240, desc: 'A healthy mix of five beans with cracked black pepper.' },
      { name: 'Aloo Methi Dum Biryani', price: 220, desc: 'Baby potatoes and fresh fenugreek leaves with a hint of garlic.' },
      { name: 'Broccoli & Almond Biryani', price: 320, desc: 'Contemporary fusion with toasted almond slivers.' },
      { name: 'Tandoori Gobi Biryani', price: 240, desc: 'Spiced cauliflower florets with a smokey finish.' },
      { name: 'Kofta Biryani', price: 290, desc: 'Vegetable dumplings stuffed with cheese and nuts in rice.' },
      { name: 'Awadhi Subz Biryani', price: 260, desc: 'The delicate, fragrant style of Lucknowi vegetable rice.' }
    ]
  },
  {
    id: 'non-veg-biryani',
    name: 'Non-Veg Biryanis',
    items: [
      { name: 'Special Chicken Dum Biryani', price: 320, desc: 'Our signature cut chicken, marinated for 24 hours.' },
      { name: 'Mutton Ghee Roast Biryani', price: 480, desc: 'Premium goat meat slow-cooked in A2 ghee and Byadgi chillies.' },
      { name: 'Egg Keema Biryani', price: 260, desc: 'Minced egg masala layered with aromatic rice.' },
      { name: 'Prawns Zaffrani Biryani', price: 520, desc: 'Jumbo prawns infused with Persian saffron and mace.' },
      { name: 'Thalassery Chicken Biryani', price: 340, desc: 'Short-grain Khaima rice with Malabar spices and fried cashews.' },
      { name: 'Ambur Mutton Biryani', price: 460, desc: 'Traditional Seeraga Samba rice specialty from Tamil Nadu.' },
      { name: 'Fish Tikka Biryani', price: 490, desc: 'Grilled Kingfish chunks layered with a tangy masala.' },
      { name: 'Chicken 65 Biryani', price: 350, desc: 'Spicy, deep-fried chicken pieces tossed in biryani rice.' },
      { name: 'Lucknowi Mutton Pulao', price: 470, desc: 'Delicate, meat-stock cooked rice with melt-in-mouth mutton.' },
      { name: 'Crab Meat Biryani', price: 580, desc: 'Freshly picked blue crab meat in a coastal spice blend.' },
      { name: 'Bhatti Da Murgh Biryani', price: 360, desc: 'Rustic, tandoor-roasted chicken with charred onions.' },
      { name: 'Donne Biryani (Mutton)', price: 440, desc: 'Bangalore style green-herb masala rice served in palm leaf.' },
      { name: 'Butter Chicken Biryani', price: 380, desc: 'The best of both worlds—creamy makhani chicken in rice.' },
      { name: 'Shahi Turkey Biryani', price: 650, desc: 'Exotic turkey meat cooked with royal spices and rose water.' },
      { name: 'Nalli Nihari Biryani', price: 550, desc: 'Slow-cooked lamb shanks with rich marrow gravy in rice.' }
    ]
  },
  {
    id: 'veg-curries',
    name: 'Veg Curries',
    items: [
      { name: 'Paneer Lasooni Palak', price: 240, desc: 'Creamy spinach base tempered with golden burnt garlic.' },
      { name: 'Butter Paneer Masala', price: 220, desc: 'Soft cottage cheese cubes in a rich, buttery tomato silk.' },
      { name: 'Dal Makhani Heritage', price: 180, desc: 'Black lentils slow-simmered for 18 hours.' },
      { name: 'Subz Deewani Handi', price: 210, desc: 'Medley of seasonal vegetables in a rich cashew-onion gravy.' },
      { name: 'Malai Kofta', price: 260, desc: 'Paneer dumplings in a sweet and spicy white gravy.' },
      { name: 'Baingan Bharta', price: 190, desc: 'Smoked eggplant mashed with peas, tomatoes, and green chillies.' },
      { name: 'Kadhai Mushroom', price: 230, desc: 'Button mushrooms tossed with bell peppers and freshly ground spices.' },
      { name: 'Bhindi Do Pyaza', price: 180, desc: 'Okra cooked with double the onions and a tangy dry masala.' },
      { name: 'Methi Matar Malai', price: 240, desc: 'A smooth, white curry of fenugreek leaves and green peas.' },
      { name: 'Navratan Korma', price: 270, desc: 'Nine different gems (veg, fruits, nuts) in a royal gravy.' },
      { name: 'Amritsari Chole', price: 170, desc: 'Dark, spicy chickpeas prepared in traditional Punjabi style.' },
      { name: 'Kaju Curry', price: 310, desc: 'Roasted whole cashews in a rich, spicy tomato-onion base.' },
      { name: 'Veg Kolhapuri', price: 220, desc: 'Extra spicy mixed vegetable curry from the heart of Maharashtra.' },
      { name: 'Aloo Gobi Adraki', price: 180, desc: 'Potatoes and cauliflower with heavy ginger juliennes.' },
      { name: 'Veg Jalfrezi', price: 210, desc: 'Batons of vegetables stir-fried in a tangy tomato sauce.' }
    ]
  },
  {
    id: 'non-veg-curries',
    name: 'Non-Veg Curries',
    items: [
      { name: 'Nawabi Chicken Curry', price: 340, desc: 'A royal white gravy preparation with cashews and cream.' },
      { name: 'Kashmiri Mutton Rogan Josh', price: 460, desc: 'Authentic thin-gravy mutton cooked with Alkanet root.' },
      { name: 'Prawns Coastal Masala', price: 440, desc: 'Fresh catch cooked in a tangy coconut and tamarind base.' },
      { name: 'Butter Chicken Classic', price: 360, desc: 'Tandoori chicken shreds in our legendary makhani gravy.' },
      { name: 'Chicken Tikka Masala', price: 350, desc: 'Grilled chicken chunks in a spicy, charred tomato gravy.' },
      { name: 'Mutton Rara', price: 490, desc: 'Slow-cooked mutton pieces combined with spiced mutton keema.' },
      { name: 'Goan Fish Curry', price: 420, desc: 'Traditional coconut-based yellow curry with pomfret.' },
      { name: 'Chicken Chettinad', price: 340, desc: 'Fiery South Indian curry with star anise and kalpasi.' },
      { name: 'Mutton Bhuna Gosht', price: 470, desc: 'Pan-fried mutton slow-cooked in its own juices.' },
      { name: 'Egg Curry Masala', price: 220, desc: 'Boiled eggs simmered in a homestyle onion-tomato gravy.' },
      { name: 'Chicken Stew (Kerala Style)', price: 330, desc: 'Mild, coconut milk-based curry with potatoes and pepper.' },
      { name: 'Keema Matar', price: 380, desc: 'Minced lamb cooked with green peas and aromatic spices.' },
      { name: 'Duck Roast Curry', price: 550, desc: 'Specialty duck meat cooked with thick coconut slices.' },
      { name: 'Laal Maas', price: 480, desc: 'Rajasthani spicy mutton curry smoked with Mathania chillies.' },
      { name: 'Chicken Do Pyaza', price: 340, desc: 'Chicken cooked with crunchy onions and whole spices.' }
    ]
  },
  {
    id: 'catering',
    name: 'Catering (Per Person)',
    items: [
      { name: 'Silver Buffet (Min 50)', price: '450/pp', desc: '1 Starter, 2 Veg Mains, 1 Non-Veg Main, 1 Dessert, Breads.' },
      { name: 'Gold Buffet (Min 50)', price: '650/pp', desc: '2 Starters, 3 Veg Mains, 2 Non-Veg Mains, 2 Desserts, Live Pasta.' },
      { name: 'Platinum Wedding (Min 100)', price: '950/pp', desc: '4 Starters, 5 Mains, 3 Desserts, Live Grill & Chat Counter.' },
      { name: 'The Beach Box (Min 20)', price: '250/pp', desc: 'Compact bento with Biryani, Raita, Salan, and Gulab Jamun.' },
      { name: 'Corporate Lunch (Daily)', price: '180/pp', desc: 'Hygienic daily meals: Dal, Sabzi, Roti, Rice, and Curd.' },
      { name: 'High Tea Social (Min 30)', price: '350/pp', desc: 'Tea/Coffee, 3 snacks (Samosa, Slider, Cake), and Cookies.' },
      { name: 'Intimate Party (10-25)', price: '750/pp', desc: 'Premium small-batch cooking with a dedicated server.' },
      { name: 'Executive Bento (Min 10)', price: '400/pp', desc: 'Paneer/Chicken Tikka, Dal, Pulao, Dessert, and Beverage.' },
      { name: 'Housewarming Special', price: '550/pp', desc: 'Traditional veg meal served on banana leaves or buffet.' },
      { name: 'Seafood Gala (Min 30)', price: '1200/pp', desc: 'Live Crab and Prawn counters with Coastal curries.' },
      { name: 'Breakfast Club (Min 50)', price: '300/pp', desc: 'Live Dosa/Omelette station, Poha, Fruit platter, Juices.' },
      { name: 'Cocktail Snacks (Min 50)', price: '500/pp', desc: '8 Varieties of heavy appetizers (Veg & Non-Veg).' },
      { name: 'Birthday Bash (Kids)', price: '350/pp', desc: 'Mini Sliders, Nuggets, Pasta, Fries, and Chocolate Fountain.' },
      { name: 'Sundowner BBQ (Min 20)', price: '850/pp', desc: 'Live marinated grills (Meat & Veg) with sourdough sides.' },
      { name: 'Royal Awadhi Feast (Min 50)', price: '1100/pp', desc: 'Authentic Galouti Kebabs, Nihari, and Shahi Tukda.' }
    ]
  }
];
export default MenuData;