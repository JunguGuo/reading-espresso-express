// // Declare a variable at the top level
// let sharedVariable;

// // Function to set the value of sharedVariable
// export function setSharedVariable(value) {
//   sharedVariable = value;
// }

// // Function to get the value of sharedVariable
// export function getSharedVariable() {
//   return sharedVariable;
// }

/* eslint-disable */
// Start Btn
let pageNum = 0;
let selectedCategory;
let selectedSubcategory;
let checkedTags = [];
let userId;
let ageGroup = 19; // Default age group is adult
let libcardInput;
let contentTags;
let hideSubcategory = true;
let checkedPuzzles = [];
$(document).ready(function () {
  libcardInput = $('#libcard');

  //GENRE: ["classic", "historical", "novel", "poetry", "psychological", "mythology", "epic", "satire", "adventure"]
  //TOPICS: ["heroism", "legend", "romance", "court life", "rebellion", "free will", "adventure", "obsession", "mythology", "morality", "justice", "redemption", "afterlife", "legacy", "society", "human nature", "destiny", "fate", "war", "humanity", "chivalry", "reality", "transformation"]
  const adultContentTags = {
    // 'Staff Picks': {
    //   'Must-Reads': ['Chinese', 'Cleveland', 'Black Culture'],
    //   // Contemporary: [],
    //   // 'World Literature': [],
    //   // 'Cultural & Social': [],
    // },
    Genre: {
      Literary: [
        'Historical',
        'Graphic Novel',
        'Fiction',
        'Family Drama',
        'Nonfiction',
        'Mystery',
        'Literary Fiction',
        'Suspense',
        'History',
        'Thriller',
        'Poetry',
      ],
      'Non-fiction': [],
      'Science Fiction': [],
    },
    Themes: {
      Themes: [
        'Classic',
        'Adventure',
        'Morality',
        'Romance',
        'Struggle',
        'Rebellion',
        'Humanity',
        'Duality',
        'Heroism',
        'Fate',
        'Gala',
      ],
      // 'Heroic and Mythical': ['Heroism', 'Legend', 'Mythology', 'Chivalry'],
      // 'Romantic and Emotional': ['Romance', 'Obsession', 'Love'],
      // 'Societal and Ethical': [
      //   'Morality',
      //   'Justice',
      //   'Society',
      //   'Humanity',
      //   'Legacy',
      // ],
      // 'Personal and Philosophical': [
      //   'Free Will',
      //   'Destiny',
      //   'Fate',
      //   'Human Nature',
      //   'Reality',
      //   'Transformation',
      // ],
      // 'Life and Death': ['Afterlife', 'Redemption'],
      // 'Conflict and Action': ['Rebellion', 'Adventure', 'War'],
    },
  };

  const teenContentTags = {
    'Staff Picks': {
      'Must-Reads': ['Cleveland', 'Black Culture', 'Sports'],
      // Inspirational: ['philosophy'],
      // 'Critical Acclaims': ['history'],
    },
    Genre: {
      Genre: [
        'Fiction',
        'Biography',
        'Fantasy',
        'Graphic Novels',
        'Poetry',
        'Mystery',
      ],
      // Technology: ['computers', 'innovation', 'programming'],
      // History: ['biography', 'immigration'],
      // Fiction: ['fantasy', 'fiction', 'graphic novels', 'mystery'],
      // NonFiction: ['nonfiction', 'education', 'business'],
    },
    Themes: {
      Themes: [
        'Art',
        'Computers',
        'Innovation',
        'Science',
        'Immigration',
        'Technology',
        'Education',
        'Business',
        'Society',
        'Nature',
      ],
      // Societal: ['society', 'ethics'],
      // Scientific: ['science', 'technology'],
      // Artistic: ['art'],
    },
  };

  // const contentTags = {
  //   Fiction: {
  //     Classics: ['Love', 'Death', 'Growth'],
  //     Fantasy: ['Epic Fantasy', 'Urban Fantasy', 'Dark Fantasy'],
  //     'Science Fiction': ['Space Opera', 'Cyberpunk', 'Dystopian'],
  //     Mystery: ['Crime', 'Detective', 'Thriller'],
  //   },
  //   'Non-Fiction': {
  //     Biographies: ['Historical Figures', 'Celebrities', 'Scientists'],
  //     'Self-Help': [
  //       'Personal Development',
  //       'Health & Wellness',
  //       'Productivity',
  //     ],
  //     History: ['Ancient History', 'Modern History', 'World Wars'],
  //     'Science & Technology': [
  //       'Artificial Intelligence',
  //       'Space Exploration',
  //       'Medicine',
  //     ],
  //   },
  //   'Staff Picks': {
  //     'Must-Reads': ['Award Winners', 'Critically Acclaimed', 'Bestsellers'],
  //     Contemporary: ['Modern Classics', 'New Releases', 'Popular Authors'],
  //     'World Literature': [
  //       'African Literature',
  //       'Asian Literature',
  //       'European Literature',
  //     ],
  //     'Cultural & Social': ['Social Justice', 'Memoirs', 'Cultural Studies'],
  //   },
  // };
  bindEventHandlers();

  libcardInput.on('keyup', function (e) {
    if (libcardInput.val() !== '') {
      $('#skipBttn')
        .removeClass('btn-outline-primary rounded-5')
        .addClass('btn-primary rounded-0')
        .text('Next');
    } else {
      $('#skipBttn')
        .removeClass('btn-primary rounded-0')
        .addClass('btn-outline-primary rounded-5')
        .text('Skip');
    }

    if (e.which === 13) {
      // Enter key is pressed
      let libcard = libcardInput.val();
      console.log('Libcard field input:', libcard);
      $('#nextBttn').click();
    }
  });
  // Optionally, re-focus on the input field whenever it loses focus
  libcardInput.on('blur', function () {
    setTimeout(function () {
      libcardInput.focus();
    }, 10);
  });

  function initTagPage() {
    if (ageGroup === 19) {
      console.log(`Age group is ${ageGroup}...setting adultContentTags`);
      contentTags = adultContentTags;
    } else {
      console.log(`Age group is ${ageGroup}...setting teenContentTags`);
      contentTags = teenContentTags;
    }
    generateCategories(contentTags);
    generateTags(contentTags);
    initializeDefaultCategory();

    //bind handlers
    // ! Tag Page

    $('#categoriesContainer').on('change', '.tab-check', function () {
      handleCategoryChange($(this));
    });
    $('#subcategoriesContainer').on('change', '.tab-check', function () {
      handleSubcategoryChange($(this));
    });
    $('#checkbox-tags').on('change', '.checkbox-input', handleTagChange);
  }

  function bindEventHandlers() {
    // ！ Nav Events
    $('#startBttn').click(function (event) {
      event.preventDefault(); // Prevent default link behavior
      updatePage('Next');
    });

    $('#backBttn').click(() => updatePage('Back'));
    $('#nextBttn').click(function (event) {
      //console.log(pageNum);
      //if lib card page is the current page and next button is clicked, we need to fetch the lib bard data from server
      if (pageNum === 2) {
        libCardNext();
      } else {
        updatePage('Next');
      }
    });
    $('#exitBttn').click(() => location.reload(true));

    $('#skipBttn').click(function (event) {
      libCardNext();
    });
    //TEST! fetch data
    // $('#fetchDataButton').click(function () {
    //   $.ajax({
    //     url: '/api/v1/users?libID=12345678', // Replace with your API endpoint
    //     type: 'GET',
    //     success: function (data) {
    //       // Process and display the data
    //       console.log(data); // Or update the DOM with the fetched data
    //       $('#dataContainer').text(JSON.stringify(data, null, 2));
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //       console.error('Error fetching data: ', textStatus, errorThrown);
    //     },
    //   });
    // });

    // ! Age Group Page
    $('#ageGroup').on('change', '.btn-check', function () {
      //var selectedValue = $(this).next('label').text();
      ageGroup = +$(this).val();
      console.log(ageGroup);
    });

    //! Puzzle Page
    $('#checkbox-puzzle').on('change', '.checkbox-input', handlePuzzleChange);
  }

  function libCardNext() {
    if (libcardInput.val() === '') {
      // if libcard input is empty, skip the libcard input and go to the next page
      updatePage('Next');
      console.log('skipping libcard input');
      return;
    }
    $.ajax({
      url: `/api/v1/users?libID=${libcardInput.val()}`, // Replace with your API endpoint
      type: 'GET',
      success: function (res) {
        // Process and display the data
        console.log(res); // Or update the DOM with the fetched data
        if (res.results === 0) {
          console.log('Library card not found, creating a new user....');
          // Create a new user
          console.log('libID: ' + libcardInput.val().toString());
          fetch('api/v1/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              libID: libcardInput.val().toString(),
            }),
          })
            .then((response) => response.json())
            .then((res) => {
              userId = res.data.user._id;
              console.log('New user ID: ' + userId);
              updatePage('Next');
            }) //res.data.Tape._id
            .catch((error) => console.error(error));
          return;
        } else {
          console.log('Found this user, user ID:' + res.data.users[0]._id);
          userId = res.data.users[0]._id;
          updatePage('Next');
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data: ', textStatus, errorThrown);
      },
    });
  }

  function initializeDefaultCategory() {
    const $defaultCategory = $(
      '#categoriesContainer .tab-check:checked',
    ).first();
    handleCategoryChange($defaultCategory);
  }

  function handleCategoryChange(radioElement) {
    selectedCategory = $(radioElement).next('label').text();
    console.log('Selected Category:', selectedCategory);
    // Additional logic for the selected category
    updateSubcategories(contentTags[selectedCategory]);
    selectedSubcategory = null;
    updateTags();
  }

  function updatePage(navDir) {
    $('#page' + pageNum).addClass('d-none');

    if (navDir === 'Next') {
      pageNum++;
      //SKIP page2 & 3 (GALA only)
      // if (pageNum === 2) {
      //   pageNum += 2;
      // }
    } else if (navDir === 'Back') {
      pageNum--;
      //SKIP page2 % 3 (GALA only)
      // if (pageNum === 3) {
      //   pageNum -= 2;
      // }
    }

    if (pageNum === 1) {
      $('#customScreen').removeClass('d-none');
    } else if (pageNum === 0) {
      $('#customScreen').addClass('d-none');
    } else if (pageNum === 6) {
      finalSubmit();
    }

    $('#page' + pageNum).removeClass('d-none');
    if (pageNum === 2) {
      libcardInput.focus();
    } else if (pageNum === 4) {
      initTagPage();
    }
    $('#pagination').text(`${pageNum} of 5`);
    $('#progressBar').css('width', `${(pageNum / 5) * 100}%`);
  }

  function finalSubmit() {
    //FINAL SUBMIT
    //window.location.href = 'receipt.html';
    // console.log(userId);
    // console.log(checkedTags);
    fetch('api/v1/tapes/construct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId,
        age: ageGroup,
        selectedTopics: checkedTags.map((tag) => tag.toLowerCase()),
        selectedPuzzles: checkedPuzzles.map((tag) => tag.toLowerCase()),
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        let tapeId = res.data.tape._id;
        console.log(tapeId);
        window.location.href = '/tape/' + tapeId;
      }) //res.data.Tape._id
      .catch((error) => console.error(error));
  }

  function generateCategories(categories) {
    const $container = $('#categoriesContainer');
    $container.empty();
    let categoryIndex = 1; // Make the first category checked by default

    $.each(categories, function (categoryName) {
      const categoryId = categoryName.toLowerCase().replace(/\s+/g, '');
      const $input = $(
        `<input type="radio" class="tab-check" name="tab-genre" id="tab-genre-${categoryId}" autocomplete="off">`,
      );
      if (categoryIndex === 1) $input.prop('checked', true);

      const $label = $(
        `<label class="tab tab-horizontal text-end px-4 py-2" for="tab-genre-${categoryId}">${categoryName}</label>`,
      );

      const $div = $('<div></div>').append($input, $label);
      $container.append($div);

      categoryIndex++;
    });

    // Manually trigger the event for the default checked radio button
    $('#categoriesContainer .tab-check:checked').each(function () {
      handleCategoryChange(this);
    });
  }

  function updateSubcategories(subcategories) {
    const $container = $('#subcategoriesContainer');
    $container.empty();

    if (hideSubcategory) {
      return;
    }

    $.each(subcategories, function (subCategoryName) {
      const subCategoryId = `${selectedCategory
        .toLowerCase()
        .replace(/\s+/g, '')}-${subCategoryName
        .toLowerCase()
        .replace(/\s+/g, '')}`;
      const $input = $(
        `<input type="radio" class="tab-check" name="tab-${selectedCategory
          .toLowerCase()
          .replace(/\s+/g, '')}" id="tab-${subCategoryId}" autocomplete="off">`,
      );
      const $label = $(
        `<label class="tab tab-horizontal text-end px-3 py-1" for="tab-${subCategoryId}">${subCategoryName}</label>`,
      );

      const $div = $('<div></div>').append($input, $label);
      $container.append($div);
    });
  }

  function handleSubcategoryChange(element) {
    selectedSubcategory = $(element).next('label').text();
    console.log('Selected Subategory:', selectedSubcategory);
    updateTags();
  }

  function handleTagChange() {
    checkedTags = $('#checkbox-tags .checkbox-input:checked')
      .map((_, el) => $(el).val())
      .get();
    console.log('Checked Tags:', checkedTags);
    //window.sharedVariable = checkedTags;
  }

  function handlePuzzleChange() {
    checkedPuzzles = $('#checkbox-puzzle .checkbox-input:checked')
      .map((_, el) => $(el).val())
      .get();
    console.log('Checked Puzzles:', checkedPuzzles);
  }

  function generateTags(obj) {
    // assumes that the structure of obj is consistent and that it only contains strings or objects. If obj can contain other types of values, you may need additional checks in your function.
    let $tagContainer = $('#tagContainer');
    $tagContainer.empty();

    let htmlContent = '';

    let queue = [obj];

    while (queue.length > 0) {
      let current = queue.shift();

      $.each(current, function (key, value) {
        if ($.isArray(value)) {
          //The forEach method is used instead of $.each for iterating over arrays, which is a bit more idiomatic in modern JavaScript.
          value.forEach((item) => {
            let itemId = item.toLowerCase().replace(/\s+/g, '');

            // In jQuery, each call to .append() can be costly in terms of performance, especially if it's inside a loop. A more efficient approach is to build up the entire HTML structure as a string or as a set of jQuery objects and append it to the DOM all at once.
            htmlContent += `<div class="m-2 checkbox-tag">
                                        <input class="checkbox-input" type="checkbox" value="${item}" id="${itemId}">
                                        <label class="checkbox-label border border-primary" for="${itemId}">${item}</label>
                                    </div>`;
          });
        } else if (typeof value === 'object') {
          queue.push(value);
        }
      });
    }

    $tagContainer.append(htmlContent);
  }

  function updateTags() {
    const tags = selectedSubcategory
      ? contentTags[selectedCategory][selectedSubcategory]
      : [].concat(...Object.values(contentTags[selectedCategory]));

    if ($.isArray(tags)) {
      $.each(tags, function (index, value) {
        //console.log(value);
      });

      // Hide other tags
      $('.checkbox-tag').each(function () {
        // Get the text content of the associated label element
        let labelText = $(this).find('label').text();

        // Check if the label's text is in the tags
        if (tags.includes(labelText)) {
          // If yes, remove the 'd-none' class
          $(this).removeClass('d-none');
        } else {
          // If no, add the 'd-none' class
          $(this).addClass('d-none');
        }
      });
    }
  }
});
