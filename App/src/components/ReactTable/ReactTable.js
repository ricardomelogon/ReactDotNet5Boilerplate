/*eslint-disable*/
import React from "react";
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination
} from "react-table";
import classnames from "classnames";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import CustomInput from "../../components/CustomInput/CustomInput.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button";
import Section from "../../components/Section/Section";

import { mdiChevronRight, mdiChevronLeft, mdiChevronUp, mdiChevronDown, mdiUnfoldMoreHorizontal } from "@mdi/js";
import { Icon } from "@mdi/react";

import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";

const newStyles = {
  ...styles,
  formControlMargins: {
    margin: "3px 0 !important"
  },
  gridContainer: {
    justifyContent: "center"
  },
  noActions: {
    "&:last-child": {
      textAlign: "initial !important",
      pointerEvents: "initial !important",
    }
  },
  rtPaging: {
    flex: "1 1",
    alignItems: "center",
    display: "flex",
  },
  rtPrevious: {
    marginRight: "15px",
    justifyContent: "flex-end",
  },
  rtNext: {
    marginLeft: "15px",
    justifyContent: "flex-start",
  },
  rtTable: {
    minWidth: "fit-content",
    minWidth: "-moz-available",
  },
  rtOvAuto:{
    overflow: "auto",
  },
  minWidth: {
    minWidth: "100px",
  },
};

const useStyles = makeStyles(newStyles);

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <CustomInput
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        value: filterValue || "",
        onChange: e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        },
        placeholder: `Search ${count} records...`
      }}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;

// Our table component
function Table({ columns, data, noActions, minWidth }) {
  const [numberOfRows, setNumberOfRows] = React.useState(10);
  const [pageSelect, handlePageSelect] = React.useState(0);
  const classes = useStyles();
  if (!minWidth) minWidth = 100;
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    nextPage,
    pageOptions,
    pageCount,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: 10, pageIndex: 0 }
    },
    useFilters, // useFilters!
    useSortBy,
    usePagination
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  // const firstPageRows = rows.slice(0, 10);
  let pageSelectData = Array.apply(null, Array(pageOptions.length)).map(
    function () { }
  );
  let numberOfRowsData = [5, 10, 20, 25, 50, 100];
  return (
    <>
      <div className={`ReactTable -striped -highlight ${classes.rtOvAuto}`}>
        <table {...getTableProps()} className={classes.rtTable} >
          <thead className="rt-thead -header">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="rt-tr">
                {headerGroup.headers.map((column, key) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classnames(`rt-th rt-resizable-header ${noActions ? classes.noActions : ''} ${classes.minWidth}`, {
                      "-cursor-pointer": (noActions ? true : headerGroup.headers.length - 1 !== key),
                      "-sort-asc": column.isSorted && !column.isSortedDesc,
                      "-sort-desc": column.isSorted && column.isSortedDesc,
                    })}
                    style={{ minWidth: `${minWidth}px` }}
                  >
                    <GridContainer direction="row" justify="space-between" className="rt-resizable-header-content">
                      <GridItem>{column.render("Header")}</GridItem>
                      {noActions ? true : headerGroup.headers.length - 1 !== key ? <Section alignItemsCenter dFlex px3>
                        {
                          column.isSorted ? column.isSortedDesc ?
                            <Icon path={mdiChevronUp} size="24px" color="rgb(0,0,0)" />
                            :
                            <Icon path={mdiChevronDown} size="24px" color="rgb(0,0,0)" />
                            :
                            <Icon path={mdiUnfoldMoreHorizontal} size="24px" color="rgb(100,100,100)" />
                        }
                      </Section> : null}
                    </GridContainer>
                    {/* Render the columns filter UI */}
                    <div>
                      {(!noActions && headerGroup.headers.length - 1 === key)
                        ? null
                        : column.canFilter
                          ? column.render("Filter")
                          : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="rt-tbody">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={classnames(
                    "rt-tr",
                    { " -odd": i % 2 === 0 },
                    { " -even": i % 2 === 1 }
                  )}
                >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} style={{ minWidth: `${minWidth}px` }} className={`rt-td ${minWidth}`}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination-bottom">
          <div className="-pagination">
            <div className={`${classes.rtPaging} ${classes.rtPrevious}`}>
              <Button justIcon round color="primary" onClick={() => previousPage()} disabled={!canPreviousPage} ><Icon path={mdiChevronLeft} /></Button>
            </div>
            <div className="-center">
              <GridContainer className={classes.gridContainer}>
                <GridItem xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                    className={
                      classes.selectFormControl +
                      " " +
                      classes.formControlMargins
                    }
                  >
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={pageSelect}
                      onChange={event => {
                        gotoPage(event.target.value);
                        handlePageSelect(event.target.value);
                      }}
                      inputProps={{
                        name: "pageSelect",
                        id: "page-select"
                      }}
                    >
                      {pageSelectData.map((prop, key) => {
                        return (
                          <MenuItem
                            key={key}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={key}
                          >
                            Page {key + 1}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                    className={
                      classes.selectFormControl +
                      " " +
                      classes.formControlMargins
                    }
                  >
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={numberOfRows}
                      onChange={event => {
                        setPageSize(event.target.value);
                        setNumberOfRows(event.target.value);
                      }}
                      inputProps={{
                        name: "numberOfRows",
                        id: "number-of-rows"
                      }}
                    >
                      {numberOfRowsData.map(prop => {
                        return (
                          <MenuItem
                            key={prop}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={prop}
                          >
                            {prop} rows
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </div>
            <div className={`${classes.rtPaging} ${classes.rtNext}`}>
              <Button justIcon round color="primary" onClick={() => nextPage()} disabled={!canNextPage} ><Icon path={mdiChevronRight} /></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== "number";

export default Table;
