import { TEXT_DOMAIN } from "../../../global/constants";

const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { __ } = wp.i18n;
const { CheckboxControl } = wp.components;
const { get, attempt, isError, clone, set, isEmpty, has, isEqual } = lodash;
const { useEffect } = wp.element;

/**
 *
 * Default Extension
 *
 */

wp.domReady(() => {
  const META_KEY = "editor_plus_post_options";

  if (!("editPost" in wp) || !("plugins" in wp)) {
    // safety check for classic editor
    return null;
  }

  const { PluginDocumentSettingPanel } = wp.editPost;
  const { registerPlugin } = wp.plugins;
  const { editPost } = wp.data.dispatch("core/editor");
  const { getEditorSettings } = wp.data.select("core/editor");

  // listening when a template inserts
  window.addEventListener("extendify-sdk::template-inserted", (e) => {
    let templateType = get(e, "detail.template.fields.type");
    let isTemplate = isEqual(templateType, "template");

    if (!isTemplate) return;

    const availableTemplates = get(
      getEditorSettings(),
      "availableTemplates",
      {}
    );

    const epPageTemplate = "editorplus-template.php";
    const editPostConfig = {
      meta: {
        [META_KEY]: JSON.stringify({
          disableTitle: true,
          disableHeader: true,
          disableFooter: true,
          enforceStyling: true,
        }),
      },
      template: epPageTemplate,
    };

    if (!has(availableTemplates, epPageTemplate)) {
      // deleting if the template does not exists
      delete editPostConfig.template;
    }

    editPost(editPostConfig);
  });

  registerPlugin("ep-disable-title", {
    render: compose([
      withSelect((select) => {
        const { getEditedPostAttribute } = select("core/editor");

        const postMeta = getEditedPostAttribute("meta");
        let postOptions = get(postMeta, "editor_plus_post_options");

        if (!isError(attempt(JSON.parse, postOptions))) {
          postOptions = JSON.parse(postOptions);
        } else {
          postOptions = {};
        }

        return {
          postOptions,
        };
      }),
      withDispatch((dispatch, { postOptions }) => {
        const { editPost } = dispatch("core/editor");

        return {
          /**
           * Handle post options change and update editor plus metadata
           *
           * @param {string} key
           * @param {any} value
           */

          onChange(key, value) {
            let newPostOptions = clone(postOptions);

            if (typeof key === "string") {
              set(newPostOptions, key, value);
            }

            if (Array.isArray(key)) {
              for (const option of key) set(newPostOptions, option, value);
            }

            // updating metadata
            editPost({
              meta: {
                [META_KEY]: JSON.stringify(newPostOptions),
              },
            });
          },
        };
      }),
    ])(({ postOptions, onChange }) => {
      const disableTitle = get(postOptions, "disableTitle") ?? false;
      const disableFooter = get(postOptions, "disableFooter") ?? false;
      const disableHeader = get(postOptions, "disableHeader") ?? false;
      const enforceStyling = get(postOptions, "enforceStyling") ?? false;

      useEffect(() => {
        document.querySelector(".editor-post-title").style.display =
          disableTitle ? "none" : "block";
      }, [disableTitle]);

      useEffect(() => {
        document.querySelector(".editor-styles-wrapper").style.backgroundColor =
          enforceStyling ? "white" : "";
      }, [enforceStyling]);

      return (
        <PluginDocumentSettingPanel
          title={__("Editor Plus Settings", TEXT_DOMAIN)}
          name="editorplus-post-options"
          icon={() => null}
        >
          <CheckboxControl
            checked={disableTitle}
            label={__("Hide title", TEXT_DOMAIN)}
            onChange={() => onChange("disableTitle", !disableTitle)}
          />
          <CheckboxControl
            checked={disableHeader}
            label={__("Hide header and footer", TEXT_DOMAIN)}
            help={__("Including your menu on this page.", TEXT_DOMAIN)}
            onChange={() =>
              onChange(["disableFooter", "disableHeader"], !disableHeader)
            }
          />
          <CheckboxControl
            checked={enforceStyling}
            label={__("Use template styles", TEXT_DOMAIN)}
            help={__("This overrides your themes styling.", TEXT_DOMAIN)}
            onChange={() => onChange("enforceStyling", !enforceStyling)}
          />
        </PluginDocumentSettingPanel>
      );
    }),
  });
});
