import { useState, useEffect } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

export interface TestPageProps {}

const TestPage: React.SFC<TestPageProps> = () => {
  const colors = ['#ff0055', '#0099ff', '#22cc88', '#ffaa00'];
  const [selected, setSelected] = useState('#ff0055');

  return (
    <AnimateSharedLayout>
      {/* <ul>
        {colors.map((color) => (
          <TestItem
            key={color}
            color={color}
            isSelected={selected === color}
            onClick={() => setSelected(color)}
          />
        ))}
      </ul> */}
    </AnimateSharedLayout>
  );
};

export default TestPage;
