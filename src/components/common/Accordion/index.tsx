import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion as MuiAccordion, NoSsr } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import cn from 'classnames';

import { IAccordionProps } from './Accordion.types';
import styles from './styles.module.scss';

const Accordion = (props: IAccordionProps) => {
  const {
    title,
    expanded,
    children,
    onChange,
    classes: { accordionRoot, titleRoot, titleWrapper, contentWrapper } = {},
  } = props;

  return (
    <NoSsr>
      <MuiAccordion
        classes={{
          root: cn(styles.rootWrapper, accordionRoot, {
            [styles.active]: expanded,
          }),
        }}
        expanded={expanded}
        onChange={onChange}
      >
        <AccordionSummary
          classes={{
            root: cn(styles.titleWrapper, titleWrapper, {
              [styles.active]: expanded,
            }),
            content: styles.titleContent,
            expanded: styles.titleExpanded,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            classes={{
              root: cn(styles.titleRoot, titleRoot, {
                [styles.active]: expanded,
              }),
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: cn(styles.contentWrapper, contentWrapper),
          }}
        >
          {children}
        </AccordionDetails>
      </MuiAccordion>
    </NoSsr>
  );
};

export default Accordion;
