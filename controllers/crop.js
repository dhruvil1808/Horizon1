const { buyerUser, farmerUser } = require('../model/credentials');
const { crop } = require('../model/crops');

module.exports = {
    postCrop: (req, res) => {
        const name = req.params.farmername;
        const postcrop = new crop(req.body);
        postcrop.sellerName = name;
        postcrop
            .save()
            .then(async (result) => {
                allcrops = await crop.find({}).sort({ name: -1 });
                await farmerUser.findOneAndUpdate({ name: name }, { $push: { crops: postcrop._id } });
                res.render("sell", { title: name, crops: allcrops, alrt: "Crop Posted Successfully" });
            }
            )
            .catch((err) => {
                res.render("404", { title: "404 Error hai" });
            }
            );
    },
    buyCrop: async (req, res) => {
        const id = req.params.id;
        const name = req.params.name;
        const bid = req.body.bid;
        var res = await buyerUser.findOne({ crops: id });
        if (res == null) {
            var result2 = await buyerUser.findOneAndUpdate({ name: name }, {
                $push: {
                    crops: id
                }
            });
            var result2 = await buyerUser.findOneAndUpdate({ name: name }, {
                $push: { amount: bid }
            });
            if (result2 != null) {
                var result = await crop.findByIdAndUpdate(id, { $push: { buyers: result2._id } });
                var result = await crop.findByIdAndUpdate(id, { $push: { amount: bid } });
                if (result !== null) {
                    allcrops = await crop.find({}).sort({ name: -1 });
                    res.render("buy", { crops: allcrops, title: name, alrt: "Bid Placed Successfully" });
                }
                else {
                    allcrops = await crop.find({}).sort({ name: -1 });
                    res.render("buy", { crops: allcrops, title: name, alrt: "Bid Failed" });
                }
            }
            else {
                res.render("buy", { title: name, alrt: "Bid Failed" });
            }
        }
    }
}