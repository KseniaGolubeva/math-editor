# math-editor

## Installation

```
npm install math-editor
```
Don't forget to include styles in the file **index.js**
```
import 'math-editor/dist/css/math-editor.min.css';
import MathEditor from 'math-editor';
...
Vue.use(MathEditor);
```

## Version: 0.1.0

This version is an alpha version and may contain errors.
If you notice any bugs or regressions please do not hesitate to report any issues.

## Description

This component allows you to create text with mathematical formulas
that are processed by KaTeX.\
The main use is writing comments under a post (for example, on a mathematical forum) or writing small articles for a website.

## Usage

The component has 3 modes "min", "max", "article".\
The "min" and "max" modes differ in the number of formula templates
provided.\
The "article" mode implies that it will be used for writing articles, so the panel with formulas can be dragged
if you pinch the top of the panel.\
In addition, you can add the option "list-formulas-data", which represents formulas created by the user.

## Props
```
list-formulas-data = [
    {
        id: number,
        formula: string
    }
]
```

## Events
You can also handle the following events
<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Description</th>
            <th>Return</th>
            <th>Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>add-formula</td>
            <td>Occurs when you click on the "Добавить" button in the formula entry drop-down block.</td>
            <td>A string containing the formula</td>
            <td>\lim\limits_{x\to 0} x</td>
        </tr>
        <tr>
            <td>delete-formula</td>
            <td>Occurs when you click on the "x" button in the drop-down block for selecting a custom formula.</td>
            <td>id of the formula to delete</td>
            <td>2</td>
        </tr>
        <tr>
            <td>save-text</td>
            <td>Occurs when you click on the "Сохранить" button.<br/>
                It is supposed to be used in the "article" mode to save text on the server</td>
            <td>Returns text to textarea</td>
            <td>My favorite formula $$\lim\limits_{x\to 0} x$$</td>
        </tr>
        <tr>
            <td>accept</td>
            <td>Occurs when you click on the "Подтвердить" button.<br/>
                It is supposed to be used for text processing.</td>
            <td>Returns text to textarea ()</td>
            <td>My favorite formula $$\lim\limits_{x\to 0} x$$</td>
        </tr>
    </tbody>
</table>


