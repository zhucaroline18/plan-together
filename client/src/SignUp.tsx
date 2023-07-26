import React, {Component} from "react";
import { ReactGrid, Column, Row, CellChange, TextCell, Cell, CellTemplate, Compatible, Uncertain, getCellProperty, keyCodes, UncertainCompatible} from "@silevis/reactgrid";
//import Container from 'react-bootstrap/Container';
//import { render } from "react-dom";
import { Button, Container } from "react-bootstrap";

interface SignUpProps {
    user: String
}

interface SignUpState {
    user: String,
    people: Person[]
}

interface Person {
    item: string;
    howManyNeeded: string;
    bringer: string;
}

const getPeople = (): Person[] => [
{ item: "Tent", howManyNeeded: "2", bringer: "Caroline" },
{ item: "stove + gas", howManyNeeded: "1", bringer: "cathleen" },
{ item: "", howManyNeeded: "", bringer: "" },
{ item: "", howManyNeeded: "", bringer: "" }
];

const getColumns = (): Column[] => [
{ columnId: "item", width: 400 },
{ columnId: "howManyNeeded", width: 200 },
{ columnId: "bringer", width: 400 }
];

const headerRow: Row = {
rowId: "header",
cells: [
    { type: "header", text: "Item" },
    { type: "header", text: "Amount Needed" },
    { type: "header", text: "Who's bringing it" }

]
};

const applyChangesToPeople = (changes: CellChange<TextCell>[], prevPeople: Person[]): Person[] => {
    changes.forEach((change) => {
        var personIndex: number = 0;
        if (typeof(change.rowId) == "string") {
            personIndex = parseInt(change.rowId);
        }
        else if (typeof(change.rowId) == "number") {
            personIndex = change.rowId;
        }

        const fieldName: string = change.columnId as string;
        (prevPeople[personIndex] as any)[fieldName] = change.newCell.text;
    });
    return [...prevPeople];
  };

const getRows = (people: Person[]): Row[] => [
    headerRow,
    ...people.map<Row>((person, idx) => ({
      rowId: idx,
      cells: [
        { type: "text", text: person.item },
        { type: "text", text: person.howManyNeeded },
        { type: "text", text: person.bringer }

      ]
    }))
  ];

export class SignUp extends Component<SignUpProps, SignUpState>{
    //setting the state to what is passed in
    constructor(props: any) {
        super(props);
        this.state = 
        { 
            user: props.user,
            people: getPeople()
        };
    }

    handleChanges = (changes: CellChange[]): void => {
        const newPeople = applyChangesToPeople(changes as any, this.state.people)

        this.setState({
            people: newPeople
        });
    };

    render(): React.ReactNode {
        const rows = getRows(this.state.people);
        const cols = getColumns();        
        return (
            <Container>
            <style type="text/css">
                {`
                    .color-nav {
                    background-color: rgb(0, 108, 132);
                    }
                    .color-lightBlue {
                        background-color: rgb(110, 181, 192);
                        }
                    .color-pink {
                        background-color: #FFCCBB;
                    }
                    .remove-line {
                        text-decoration: none;
                        color: rgb(110, 181, 192);
                        }
                    .nav-tabs .nav-item .nav-link {
                            color: rgb(110, 181, 192);
                          }
                    .nav-tabs .nav-item .nav-link.active {
                            color:rgb(0, 108, 132);
                          }
                    .accordion-button:not(.collapsed) {
                        background-color: #FFCCBB;
                    }
                `}
            </style>

            
            <div className = "p-3">
            <ReactGrid
            
            rows={rows} 
            columns={cols} 
            onCellsChanged={this.handleChanges}
            />
            </div>

            <Button size = "lg" className = "p-3 color-lightBlue" type="submit">
                Add Row
            </Button>
            
            </Container>
            
        );
    }
}


export interface CheckboxCell extends Cell {
    type: 'checkbox';
    checked: boolean;
    checkedText?: string;
    uncheckedText?: string;
}

export class CheckboxCellTemplate implements CellTemplate<CheckboxCell> {

    getCompatibleCell(uncertainCell: Uncertain<CheckboxCell>): Compatible<CheckboxCell> {
        const checked = getCellProperty(uncertainCell, 'checked', 'boolean');
        const text = checked ?
            uncertainCell.checkedText ? uncertainCell.checkedText : '1' :
            uncertainCell.uncheckedText ? uncertainCell.uncheckedText : '';
        return { ...uncertainCell, checked: !!checked, value: checked ? 1 : NaN, text };
    }

    handleKeyDown(cell: Compatible<CheckboxCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): { cell: Compatible<CheckboxCell>; enableEditMode: boolean } {
        if (!shift && (keyCode === keyCodes.SPACE || keyCode === keyCodes.ENTER))
            return { cell: this.getCompatibleCell(this.toggleCheckboxCell(cell)), enableEditMode: false }
        return { cell, enableEditMode: false }
    }

    private toggleCheckboxCell(cell: Compatible<CheckboxCell>): Compatible<CheckboxCell> {
        return this.getCompatibleCell({ ...cell, checked: !cell.checked })
    }

    update(cell: Compatible<CheckboxCell>, cellToMerge: UncertainCompatible<CheckboxCell>): Compatible<CheckboxCell> {
        const checked = cellToMerge.type === 'checkbox' ? cellToMerge.checked : !!cellToMerge.value;
        return this.getCompatibleCell({ ...cell, checked });
    }

    getClassName(cell: Compatible<CheckboxCell>): string {
        return cell.className ? cell.className : '';
    }

    render(cell: Compatible<CheckboxCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<CheckboxCell>, commit: boolean) => void): React.ReactNode {
        return (
            <label>
                <input
                    type='checkbox'
                    checked={cell.checked}
                    onChange={e => onCellChanged(this.toggleCheckboxCell(cell), true)}
                />
                <span></span>
            </label>
        )
    }

}