import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Table } from './Table';

describe('<Table />', () => {
  const config = [
    { key: 'id', label: 'id', dataType: 'string', type: 'column' },
  ];
  const data = [{ id: '123456789' }, { id: 'anotherRecord' }];
  const onClick = jest.fn();
  const onPageClick = jest.fn();
  const onColumnSort = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('will not display the table if no data is present', () => {
    render(<Table config={config} errorMessage='No Table Data found' />);
    expect(screen.queryByText('No Table Data found')).toBeInTheDocument();
  });

  it('will not display the table if no table config is present', () => {
    render(<Table data={data} errorMessage='No Table Config found' />);
    expect(screen.queryByText('No Table Config found')).toBeInTheDocument();
  });

  it('will display the table if table config and data is present', () => {
    render(
      <Table
        config={config}
        data={data}
        errorMessage='No Table Config found'
        defaultSortKey='id'
        defaultSortOrder={false}
      />
    );
    expect(screen.queryByText('123456789')).toBeInTheDocument();
  });

  it('will show no results message if no data is present in data array prop', () => {
    render(
      <Table data={[]} config={config} noResultsMessage='No Table Results' />
    );
    expect(screen.queryByText('No Table Results')).toBeInTheDocument();
  });

  it('will display how many rows of data are available to see in the table', () => {
    render(
      <Table config={config} data={data} errorMessage='No Table Config found'>
        <Table.Paging onlyShowResults resultsText='Showing 1 of 1 row' />
      </Table>
    );
    expect(screen.queryByText('Showing 1 of 1 row')).toBeInTheDocument();
  });

  it('will display how many table pages are available to view in the table', () => {
    render(
      <Table config={config} data={data} errorMessage='No Table Config found'>
        <Table.Paging
          resultsText='Showing 1 of 1 row'
          totalNumberOfPages={data.length / 1}
        />
      </Table>
    );
    expect(screen.queryByLabelText('Page 2')).toBeInTheDocument();
  });

  it('will trigger the onClick function when a table data row is clicked', () => {
    render(
      <Table
        config={config}
        data={data}
        errorMessage='No Table Config found'
        onClick={onClick}
      />
    );

    // Trigger click on table row
    fireEvent.click(screen.getByText('123456789'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('will trigger the onPageClick function when a specific page or page arrows button are pressed', () => {
    render(
      <Table config={config} data={data} errorMessage='No Table Config found'>
        <Table.Paging
          resultsText='Showing 1 of 1 row'
          totalNumberOfPages={data.length / 1}
          onPageClick={onPageClick}
        />
      </Table>
    );

    // Trigger click on table page button
    fireEvent.click(screen.queryByLabelText('Page 2'));
    expect(onPageClick).toHaveBeenCalledTimes(1);
  });

  it('will trigger the onColumnSort function when a table column title is selected', () => {
    render(
      <Table
        config={config}
        data={data}
        errorMessage='No Table Config found'
        onClick={onClick}
        onColumnSort={onColumnSort}
      />
    );

    // Trigger click on table column title
    fireEvent.click(screen.queryByText('id'));
    expect(onColumnSort).toHaveBeenCalledTimes(1);
  });

  it('will not trigger the onColumnSort function if sortWithinTable prop is present', () => {
    render(
      <Table
        config={config}
        data={data}
        errorMessage='No Table Config found'
        onClick={onClick}
        onColumnSort={onColumnSort}
        sortWithinTable
      />
    );

    // Trigger click on table column title
    fireEvent.click(screen.queryByText('id'));
    expect(onColumnSort).toHaveBeenCalledTimes(0);
  });

  it('displays a prefix if one is defined in the config', () => {
    const localconfig = [
      {
        key: 'id',
        label: 'id',
        dataType: 'string',
        type: 'column',
        prefix: 'Pre',
      },
    ];
    const localdata = [{ id: '123456789' }];
    render(
      <Table
        config={localconfig}
        data={localdata}
        errorMessage='No Table Config found'
      />
    );
    expect(screen.getByText('Pre')).toBeInTheDocument();
  });

  it('displays a prefix if one is defined in the config', () => {
    const localconfig = [
      {
        key: 'id',
        label: 'id',
        dataType: 'string',
        type: 'column',
        suffix: 'Suf',
      },
    ];
    const localdata = [{ id: '123456789' }];
    render(
      <Table
        config={localconfig}
        data={localdata}
        errorMessage='No Table Config found'
      />
    );
    expect(screen.getByText('Suf')).toBeInTheDocument();
  });

  it('should change styling of a table header/row if it has type of section in config', () => {
    const localconfig = [
      {
        active: true,
        id: 'section-test',
        label: 'Section',
        parentID: '0',
        reference: 'Section',
        type: 'section',
        sortOrder: 1,
      },
      {
        active: true,
        childElements: [],
        dataType: 'string',
        filter: 'None',
        id: 'column-kjvmagpl',
        key: 'prispecies',
        label: 'Dom. Species',
        parentID: 'section-test',
        searchable: true,
        sortOrder: 0,
        sortable: true,
        type: 'column',
      },
    ];
    const localdata = [{ id: '10078', prispecies: '123456789' }];
    render(
      <Table
        config={localconfig}
        data={localdata}
        errorMessage='No Table Config found'
      />
    );
    // Make sure sections appear in the table
    expect(
      screen.queryByTestId('tableHeader-section-test')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('tableRow-10078-prispecies')
    ).toBeInTheDocument();

    expect(screen.queryByTestId('tableHeader-section-test')).toHaveClass(
      'sectionHeader'
    );
    expect(screen.queryByTestId('tableRowSection-10078')).toHaveClass(
      'section'
    );
  });

  it('should centre text in a table column if the config has the centre key as true', () => {
    const localconfig = [
      {
        center: true,
        id: 'id',
        key: 'id',
        label: 'id',
        dataType: 'string',
        type: 'column',
        prefix: 'Pre',
      },
    ];
    const localdata = [{ id: '123456789' }];
    render(
      <Table
        config={localconfig}
        data={localdata}
        errorMessage='No Table Config found'
      />
    );
    expect(screen.getByTestId('tableRow-123456789-id')).toHaveStyle(
      'text-align: center'
    );
    expect(screen.getByTestId('tableHeader-id')).toHaveStyle(
      'text-align: center'
    );
  });

  it('sets a defined column width if one is stated in the config', () => {
    const localconfig = [
      {
        id: 'id',
        key: 'id',
        label: 'id',
        dataType: 'string',
        type: 'column',
        width: 200,
      },
    ];
    const localdata = [{ id: '123456789' }];
    render(
      <Table
        config={localconfig}
        data={localdata}
        errorMessage='No Table Config found'
        sortWithinTable
        minColumnWidth={200}
      />
    );
    expect(screen.getByTestId('tableHeaderWrapper')).toHaveStyle(
      'grid-template-columns: 200px'
    );
    expect(screen.getByTestId('tableHeader-id')).toHaveStyle(
      'min-width: 200px'
    );
  });

  it('should display a ghost row if one is needed to fill the table', () => {
    const localconfig = [
      {
        id: 'id',
        key: 'id',
        label: 'id',
        dataType: 'string',
        type: 'column',
        width: 200,
      },
    ];
    const localdata = [{ id: '123456789' }];
    render(
      <Table
        config={localconfig}
        data={localdata}
        onClick={onClick}
        errorMessage='No Table Config found'
        numberOfRowsPerPage={2}
      />
    );

    // Test styling of table row
    expect(screen.queryByTestId('tableRow-ghost')).toHaveClass('ghost');

    // Test that ghost row doesn't trigger a click event
    fireEvent.click(screen.queryByTestId('tableRow-ghost-id'));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should have a min width on the table', () => {
    render(
      <Table config={config} data={data} errorMessage='No Table Config found'>
        <Table.Paging onlyShowResults resultsText='Showing 1 of 1 row' />
      </Table>
    );

    expect(screen.getByTestId('table')).toHaveStyle('min-width: 130px');
  });
});
