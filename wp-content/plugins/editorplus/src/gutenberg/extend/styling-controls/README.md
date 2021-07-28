# Extend Styling Controls

You can extend the built-in editor plus styling controls in your own custom gutenberg block.

## Setup

Before adding controls in your gutenberg block. Some things must be setup first.

### Create Styles JSON

You can create multiple styles group JSON.

    {

    	"textStyles": {

    	"target":  "my-test-para",

    	"responsive":  true,

    	"hover":  true,

    	"options": [

    			{

    			"label":  "Margin",

    			"control":  "Dimensions",

    			"attribute":  "margin",

    			"css":  "margin"

    			},

    			{

    			"label":  "Padding",

    			"control":  "Dimensions",

    			"attribute":  "padding",

    			"css":  "padding"

    			}

    		]

    	}

    }

#### Available Editor Plus Style Controls

| Control                                                                                                            | Description                                                               | How to write default value?                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dimensions                                                                                                         | Will render 4 boxed inputs                                                | -                                                                                                                                                       |
| Sizing                                                                                                             | Will Render 4 range controls including Width, MaxWidth, Height, MaxHeight | `width, max-width, max-height, height`                                                                                                                  |
| [OtherSettings](https://github.com/ZafarKamal123/editors-plus/tree/master/src/components/styling-controls/other)   | Will render css controls for Display, Transition, Z-index, Overflow       | `display, transition, z-index, overflow`                                                                                                                |
| Border                                                                                                             | Will render border control for top, right, bottom, left                   | `border , border-top, border-left, border-right`                                                                                                        |
| Shadow                                                                                                             | Will render box shadow picker                                             | -                                                                                                                                                       |
| [Background](https://github.com/ZafarKamal123/editors-plus/tree/master/src/components/styling-controls/background) | Will render background picker                                             | `solid, gradient`                                                                                                                                       |
| Typography                                                                                                         | Will render css picker for typography options                             | ` line-height, font-size, letter-spacing, font-weight, text-color, underline-color, underline-style ,linethrough-color, linethrough-style, text-styles` |
| [Range](https://github.com/ZafarKamal123/editors-plus/tree/master/src/components/styling-controls/range)           | Will render range control with unit option                                | -                                                                                                                                                       |
| ColorPicker                                                                                                        | Will render a color picker                                                | -                                                                                                                                                       |
| Button Group                                                                                                       | Will render a button group picker                                         | -                                                                                                                                                       |

### Add Editor Plus Attribute

This attribute is used for storing module settings. Just add this below the block attributes.

    epStylingOptions: {
    	type:  "object",
    	default: controls,
    }

## Usage

### Edit File

You can import the required module like this. In the edit file.

    const { StylingControls, RenderStyles } = editorPlus.components;

### Render Styles

It's used for rendering block styles. Use it once in the block for all the
styling.

| Props    | Description     | Required |
| -------- | --------------- | -------- |
| clientId | Block Client Id | true     |

### Styling Controls

It's used for rendering styling controls of certain group.

| Props   | Description                  | Required |
| ------- | ---------------------------- | -------- |
| group   | Styling controls group name  | true     |
| options | Option That will be rendered | true     |

Use the above two components like this in the edit file.

    <RenderStyles  clientId={props.clientId} />
    <InspectorControls>
    	<StylingControls
    		initialOpen={false}
    		title="Design"
    		group="textStyles"
    		options={textStyles}
    	/>
    </InspectorControls>

### Save File

In the save file to render the styles first import the module below

    const { RenderSavedStyles } = editorPlus.components;

And use it like this

    <RenderSavedStyles {...props} />
