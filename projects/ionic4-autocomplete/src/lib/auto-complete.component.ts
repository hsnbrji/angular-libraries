import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'ion-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutoCompleteComponent),
            multi: true,
        }]
})
export class AutoCompleteComponent implements ControlValueAccessor {

    @Input()
    suggestions: any[];
    @Input()
    labelField = 'name';
    @Input()
    idField = 'id';
    @Input()
    placeholder = 'Search';
    @Input()
    readonly = false;
    filteredSuggestions: any[] = [];
    @Input()
    inputValue = '';
    @Output()
    itemSelected: EventEmitter<any> = new EventEmitter<any>();
    hoveredSuggestion: any;
    hoveredIndex = 0;
    arrowKeyCodes = [38, 40, 13];
    private propagateChange = (_: any) => { };

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        if (obj && this.suggestions) {
            this.suggestions.forEach(item => {
                if (item[this.idField] === obj) {
                    this.itemClickCallbackHandler(item);
                }
            });
        }
    }

    filter(value: string) {
        // if (!value) {
        //     this.filteredSuggestions = [];
        //     return;
        // }
        this.filteredSuggestions = this.suggestions.filter(suggestion =>
            suggestion[this.labelField].toLowerCase().indexOf(value.toLowerCase()) >= 0);
        const max = this.filteredSuggestions.length > 50 ? 50 : this.filteredSuggestions.length;
        if (this.filteredSuggestions && this.filteredSuggestions.length > 0) {
            this.filteredSuggestions = this.filteredSuggestions.slice(0, max);
            this.hoveredSuggestion = this.filteredSuggestions[0];
        }
    }

    hideSuggestions() {
        setTimeout(() => {
            this.filteredSuggestions = [];
        }, 200);
    }

    handleFocus() {
        if (!this.readonly) {
            this.filter(this.inputValue);
        }
    }

    keyUpCallbackHandler(event) {
        if (this.arrowKeyCodes.indexOf(event.which) === -1) {
            this.filter(this.inputValue);
        } else if (this.filteredSuggestions && this.filteredSuggestions.length > 0) {
            if (event.which === 40) {// arrow down
                if (this.hoveredIndex === this.filteredSuggestions.length - 1) {
                    this.hoveredIndex = 0;
                } else {
                    this.hoveredIndex++;
                }
                this.hoveredSuggestion = this.filteredSuggestions[this.hoveredIndex];
            } else if (event.which === 38) {// arrow up
                if (this.hoveredIndex === 0) {
                    this.hoveredIndex = this.filteredSuggestions.length - 1;
                } else {
                    this.hoveredIndex--;
                }
                this.hoveredSuggestion = this.filteredSuggestions[this.hoveredIndex];
            } else {// enter
                event.preventDefault();
                event.stopImmediatePropagation();
                this.itemClickCallbackHandler(this.hoveredSuggestion);
            }
        }

    }

    itemClickCallbackHandler(item: any) {
        this.inputValue = item[this.labelField];
        this.filteredSuggestions = [];
        this.hoveredSuggestion = null;
        this.hoveredIndex = 0;
        this.itemSelected.emit(item);
        this.propagateChange(item[this.idField]);
    }

    hoverSuggestion(index: number) {
        this.hoveredIndex = index;
        this.hoveredSuggestion = this.filteredSuggestions[this.hoveredIndex];
    }

}
