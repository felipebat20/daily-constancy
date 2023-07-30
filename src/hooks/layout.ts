export const TASK_LAYOUT = 'AT_TASK_LAYOUT';
export const GRID_LAYOUT = 'GRID_LAYOUT';
export const CARD_LAYOUT = 'CARD_LAYOUT';

export const isGridLayout = () => {
  const current_layout = localStorage.getItem(TASK_LAYOUT);

  if (current_layout) {
    return current_layout === GRID_LAYOUT;
  }

  return  true;
}

export const updateTaskLayout = (layout: string) => localStorage.setItem(TASK_LAYOUT, layout);
