# Error Find

A React Router application for rendering quizzes

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjpatdu-credovita%2Ferror-find-quiz-app)

## Stack

* [React Router v7](https://reactrouter.com/)
* Styling using [Tailwind](https://tailwindcss.com/)
* Animations with [Motion](https://motion.dev/)

## Project Structure

The `app` directory organizes the core application code with a clear separation of concerns:

* `routes/`: Defines the application's routes and handles data loading. Following React Router's [filename-based routing conventions](https://reactrouter.com/how-to/file-route-conventions), components in this directory are responsible for fetching the necessary data for each page view.
* `views/`: Contains components responsible for the UI structure, presentation logic, and behavior for each route. Typically, a route component from `routes/` will load data and then render the corresponding view component from `views/`, passing the data down as props. This separates the data fetching/routing layer from the UI/presentation layer.
* `uilib/`: Houses the "box-based" UI component library. These are the foundational, generic building blocks for the user interface. Refer to the component documentation below for details.
* `uiComponents/`: Contains domain-specific, reusable UI components that represent distinct parts of the application's interface (e.g., questions, scoreboards). These components are built using elements from `uilib/` and are primarily composed together within the View components in `views/`.
* `utilityComponents/`: Provides helper React components focused on functionality rather than direct presentation.
* `jsutils`: Provides reusable non-UI utilities.

## Types

The types in `quizTypes.ts` define the data structures for quizzes and how results are stored.

### Quiz Structure Types

The following base types represent the parts of the quiz:

#### `Quiz`

The top-level container holding the collection of all activities for the entire quiz

#### `Activity`

Represents an exercise as initially defined in the API, containing either a direct list of `Question` or multiple `Round` of questions.

#### `TransformedActivity`

Represents an activity after processing, ensuring its content is always structured within one or more `Round`. This makes every activity have a consistent data structure to simplify application logic. 

#### `Round`

A group of questions within a multi-round or transformed activity.

#### `Question`

The basic interactive unit presented to the user, containing the stimulus and answer information.

### Result Structure Types

These base types represent how activity results are stored:

#### `RoundResult`

Aggregates the results for all questions (`QuestionResult`) within a completed round.

#### `QuestionResult`

Contains the base information about the outcome of a user's interaction with a single question.

## UI Library

The application has a strongly-opinionated box-based UI, where each page (i.e. component in `view`) is represented by exactly one box.

Colors and spacings are strictly defined by this UI library.

Typically, a page would be represented as:

```html
<BoxView>
    <BoxWide> (Or <BoxNarrow>)
        <BoxHeader superscript="" title=""/>
        <BoxBody>
            <p>Content here</p>
        </BoxBody>
        <BoxFooter>
            <button>Footer button</button>
        </BoxFooter>
    </BoxWide>
</BoxView>
```
### UI Components

The UI library has the following components:

#### `BoxView`

Represents the entire page. The _only_ child of BoxView should be a box (`BoxWide` or `BoxNarrow`).

This component handles the layout of the child box inside the page and adds a slide transition when a box is created or destroyed.

It is expected that every view uses this component as the parent of all the view's children. 

#### `BoxWide` and `BoxNarrow`

These two components represent the actual boxes. Boxes are akin to [cards](https://m3.material.io/components/cards/overview) in Material Design, where you have a header, body, and footer.

There are two kinds of boxes, a wide box represented by `BoxWide` and a narrow box represented by `BoxNarrow`.

#### `BoxHeader`

This is an _optional_ child of `BoxWide` or `BoxNarrow` that represents the header of the box.

This component takes the fol;owing params:

- `title`: Large text representing the title of the card.
- `superscript`: Akin to a subtitle, albeit placed _above_ the `title`.

#### `BoxBody`

Container for the actual contents of the box, such as lists, images, text, etc.

#### `BoxList` and `BoxListItem`

Represents a styled list similar to Material Design [lists](https://m3.material.io/components/lists/overview).

This applies a style of padding in each list item, a pale blue background, and blue separator lines between list items.

To create a list inside a `BoxBody`, wrap each list item (such as a flexbox div) inside a `BoxListItem`. Then, all `BoxListItem` must be children of a `BoxList`.

#### `BoxRibbon`

Represents container with predefined padding, pale blue background, and blue top and bottom borders. This can be useful in providing highlight or emphasis to the children of `BoxBody` and creating separation between the `BoxHeader` and `BoxFooter`.

#### `BoxFooter`

Represents the footer of a box. Automatically applies padding, uppercase text, and bold font, flexbox, and `justify-center` spacing between elements.

## Development

Install the dependencies:

```bash
npm install
```

Then, start the development server with hot reloads:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Build and Deploy

This app uses [Vercel Preset](https://vercel.com/docs/frameworks/react-router#vercel-react-router-preset) to enable deployments to Vercel.

To manually create a production build:

```bash
npm run build
```