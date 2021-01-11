import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { StructuredProductService } from 'src/app/core/services/structured-product.service';
import { ProductComponentType } from 'src/app/shared/enums/product-component-type.enum';
import { CbComponent } from 'src/app/shared/models/cb-component.model';
import { StructuredProduct } from 'src/app/shared/models/structured-product.model';
import { ZcComponent } from 'src/app/shared/models/zc-component.model';
import { integerValidator, numberValidator } from 'src/app/shared/validators/numeric-validators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BaseComponent } from 'src/app/shared/models/base-component';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-structured-product-detail',
  templateUrl: './structured-product-detail.component.html',
  styleUrls: ['./structured-product-detail.component.scss']
})
export class StructuredProductDetailComponent implements OnInit {
  product: StructuredProduct | undefined;
  error = '';
  updateError = '';
  loading = false;
  submitting = false;
  isin: string | null;
  componentFormGroup: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private structuredProductService: StructuredProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.isin = null;
    const typeControl = new FormControl('', [Validators.required]);
    this.componentFormGroup = this.formBuilder.group({
      type: typeControl,
      value: new FormControl('', [numberValidator()]),
      startDate: new FormControl('', [Validators.required]),
      quantity: new FormControl(''),
      tickers: new FormControl()
    });
    typeControl.valueChanges.subscribe((val) => {
      this.componentFormGroup.get('quantity')?.clearValidators();
      switch (val) {
        case ProductComponentType.ZC:
          this.componentFormGroup.get('quantity')?.setValidators(integerValidator());
          break;
        case ProductComponentType.CB:
          break;
        default: break;
      }
    });
  }

  ngOnInit(): void {
    this.isin = this.route.snapshot.paramMap.get('id');
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.product = undefined;
    if (this.isin) {
      this.structuredProductService.getProductDetails(this.isin).then((data) => {
        this.loading = false;
        this.product = data;
      }, (error) => {
        this.loading = false;
        console.warn(error);
        this.error = error;
      });
    } else {
      this.error = 'Invalid ISIN';
    }
  }

  getTickers(component: BaseComponent): string[] {
    return (component as CbComponent).tickers;
  }

  getQuantity(component: BaseComponent): number {
    return (component as ZcComponent).quantity;
  }

  clearForm(): void {
    this.updateError = '';
    this.componentFormGroup.reset();
    this.componentFormGroup.get('type')?.setErrors(null);
    this.componentFormGroup.get('value')?.setErrors(null);
    this.componentFormGroup.get('startDate')?.setErrors(null);
    this.componentFormGroup.get('quantity')?.setErrors(null);
    this.componentFormGroup.get('tickers')?.setErrors(null);
  }

  addComponent(): void {
    if (this.componentFormGroup.invalid) {
      return;
    }
    let newComponent: BaseComponent | null;
    newComponent = null;
    const type = this.componentFormGroup.get('type')?.value;
    const value = this.componentFormGroup.get('value')?.value;
    const startDate = this.componentFormGroup.get('startDate')?.value;
    const startDateString = Utils.convertDateToYYYYMMDD(startDate);

    switch (type) {
      case ProductComponentType.CB:
        const tickers = this.componentFormGroup.get('tickers')?.value;
        newComponent = new CbComponent(
          value,
          startDateString,
          tickers
        );
        break;
      case ProductComponentType.ZC:
        const quantity = this.componentFormGroup.get('quantity')?.value;
        newComponent = new ZcComponent(
          value,
          startDateString,
          quantity
        );
        break;
      default:
        console.warn('invalid type', type);
    }
    if (newComponent && this.isin) {
      this.clearForm();
      this.submitting = true;
      this.structuredProductService.addComponent(this.isin, newComponent).then(() => {
        this.refresh();
        this.submitting = false;
      }, (error) => {
        this.updateError = error;
        this.submitting = false;
      });
    }
  }

  get tickers(): AbstractControl | null  {
    return this.componentFormGroup.get('tickers');
  }

  addTicker(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (!this.tickers?.value) {
        this.tickers?.setValue([]);
      }
      this.tickers?.setValue([...this.tickers?.value, value.trim()]);
      this.tickers?.updateValueAndValidity();
    }

    if (input) {
      input.value = '';
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.componentFormGroup.controls[controlName].hasError(errorName);
  }

  removeTicker(ticker: string): void {
    const index = this.tickers?.value.indexOf(ticker);

    if (index >= 0) {
      this.tickers?.value.splice(index, 1);
      this.tickers?.updateValueAndValidity();
    }
  }
}
