/**
 * Creates a deck
 * @param {String} deck name of deck
 */
const createDeck = deck => {
  return {
    action: 'createDeck',
    version: 6,
    params: {
      deck: deck
    }
  };
};

const getModelNames = {
  action: 'modelNamesAndIds',
  version: 6
};

/**
 * Gets the fields associated with the model
 * @param {String} modelName name of model
 */
const getModelFields = modelName => {
  return {
    action: 'modelTemplates',
    version: 6,
    params: {
      modelName
    }
  };
};

/**
 * Adds a single note to the deck
 * @param {String} deckName
 * @param {String} modelName
 * @param {String} Front what shows up first
 * @param {String} Back the answer
 * @param {[String]} tags
 */
const addNote = (deckName, modelName, Front, Back, tags) => {
  return {
    action: 'addNote',
    version: 6,
    params: {
      note: {
        deckName,
        modelName,
        fields: {
          Front,
          Back
        },
        options: { allowDuplicate: false },
        tags
      }
    }
  };
};

/**
 * Adds multiple notes to the deck
 * @param {String} deckName
 * @param {String} modelName
 * @param {[String]} Front
 * @param {[String] Back
 */
const addNotes = (deckName, modelName, Front, Back, tags) => {
  const createNote = (deckName, modelName, front, back, tags) => {
    return {
      deckName,
      modelName,
      fields: { Front: front, Back: back },
      options: { allowDuplicate: false },
      tags
    };
  };

  const notes = Front.map((note, i) => createNote(deckName, modelName, note, Back[i], tags));

  return {
    action: 'addNotes',
    version: 6,
    params: {
      notes
    }
  };
};

module.exports = {
  createDeck,
  getModelNames,
  getModelFields,
  addNote,
  addNotes
};
