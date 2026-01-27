import { Node } from '@tiptap/core';

const VisualizationEmbed = Node.create({
  name: 'visualizationEmbed',
  group: 'block',
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      type: {
        default: null,
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attrs => ({ 'data-type': attrs.type }),
      },
      class: {
        default: 'visualization-embed',
        parseHTML: () => 'visualization-embed',
        renderHTML: attrs => ({ class: attrs.class }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.visualization-embed',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes];
  },
});

export default VisualizationEmbed;