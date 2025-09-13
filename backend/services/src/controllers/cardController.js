const Card = require("../../models/card");

exports.storeCard = async (req, res, next) => {
  const { merchantId, cardHolderName, cardNumber, expiryDate, cvv } = req.body;

  if (!merchantId || !cardHolderName || !cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const card = new Card({
      merchantId,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
    });

    await card.save();
    res.status(201).json({ message: "Card stored successfully." });
  } catch (error) {
    console.error("Error storing card:", error);
    res
      .status(500)
      .json({ error: "An error occurred while storing the card." });
  }
};

exports.getCardsByMerchantId = async (req, res, next) => {
  const { merchantId } = req.params;

  try {
    const cards = await Card.find({ merchantId });

    if (cards.length === 0) {
      return res
        .status(404)
        .json({ error: "No cards found for this merchant." });
    }

    const decryptedCards = cards.map((card) => ({
      cardHolderName: card.cardHolderName,
      ...card.decryptCardDetails(),
    }));

    res.status(200).json(decryptedCards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the cards." });
  }
};

exports.deleteCard = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndDelete(cardId);

    if (!card) {
      return res.status(404).json({ error: "Card not found." });
    }

    res.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    console.error("Error deleting card:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the card." });
  }
};
