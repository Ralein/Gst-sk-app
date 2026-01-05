# GST Filing App - Feature Enhancement Plan

Implementation plan for 7 selected features to improve the GST JSON generation experience.

---

## 1. Duplicate Invoice Detection

**Complexity:** Low | **Files:** 1

Detect when the same invoice number appears multiple times for the same GSTIN and flag it as a warning/error.

#### [MODIFY] [b2b-processor.ts](file:///e:/gst-app/gst/lib/services/processors/b2b-processor.ts)

- Add duplicate detection in `validateB2BRows()` function
- Create a Map to track `GSTIN + InvoiceNumber` combinations
- If duplicate found, add error: "Duplicate invoice: Invoice {number} already exists for GSTIN {gstin}"

---

## 2. Inline Error Fixing with Excel Export

**Complexity:** High | **Files:** 3-4

Allow users to edit error fields directly in the browser and export corrected data back to Excel.

#### [NEW] [error-editor.tsx](file:///e:/gst-app/gst/components/error-editor.tsx)

- Modal/inline form to edit error row fields
- Pre-populate with current values
- Validate on save using existing schemas
- Move corrected row to valid invoices

#### [MODIFY] [gst-store.ts](file:///e:/gst-app/gst/store/gst-store.ts)

- Add `updateErrorRow(index, data)` action
- Add `moveErrorToValid(index)` action  
- Add `exportToExcel()` action using exceljs library

#### [MODIFY] [error-details.tsx](file:///e:/gst-app/gst/components/error-details.tsx)

- Add "Edit" button on each error row
- Open error-editor modal on click

#### [MODIFY] [page.tsx](file:///e:/gst-app/gst/app/page.tsx)

- Add "Export Corrected Excel" button in action bar

---

## 3. Multi-File Upload Support

**Complexity:** Medium | **Files:** 3

Allow uploading multiple Excel/CSV files and merge them into a single JSON output.

#### [MODIFY] [file-dropzone.tsx](file:///e:/gst-app/gst/components/file-dropzone.tsx)

- Accept multiple files (change `multiple` attribute)
- Show list of uploaded files with remove option
- "Process All Files" button

#### [MODIFY] [gst-store.ts](file:///e:/gst-app/gst/store/gst-store.ts)

- Change `rawFile` to `rawFiles: File[]`
- Update `uploadFile` to `uploadFiles`
- Process all files and merge invoices/errors

#### [MODIFY] [excel-processor.ts](file:///e:/gst-app/gst/lib/services/excel-processor.ts)

- Add `processMultipleFiles(files: File[])` function
- Aggregate results from all files

---

## 4. Dark/Light Mode Toggle

**Complexity:** Low | **Files:** 2

Make theme toggle prominent in header and persist preference.

#### [NEW] [theme-toggle.tsx](file:///e:/gst-app/gst/components/theme-toggle.tsx)

- Button with Sun/Moon icons
- Toggle between light/dark themes
- Use next-themes (already installed)

#### [MODIFY] [dashboard-shell.tsx](file:///e:/gst-app/gst/components/dashboard-shell.tsx)

- Add ThemeToggle component to header
- Position in top-right corner

---

## 5. Template with Sample Data

**Complexity:** Low | **Files:** 1 (Excel)

Create an enhanced template with sample data and clear instructions.

#### [MODIFY] [GST_Template.xlsx](file:///e:/gst-app/gst/public/GST_Template.xlsx)

- Add sample rows with realistic data:
  - Valid GSTIN examples
  - Different tax rates (5%, 12%, 18%, 28%)
  - Different places of supply
- Add "Instructions" sheet with:
  - Column explanations
  - Common errors to avoid
  - Link to GST state codes
- Keep formulas for auto-calculation

---

## 6. Print Summary

**Complexity:** Medium | **Files:** 2

Generate a printable summary page with all tax details.

#### [NEW] [print-summary.tsx](file:///e:/gst-app/gst/components/print-summary.tsx)

- Print-optimized layout (CSS @media print)
- Include:
  - Filing period & GSTIN header
  - Invoice count summary
  - Tax breakdown (CGST, SGST, IGST, Cess)
  - Recipient-wise summary table
  - HSN summary
- "Print" button triggers window.print()

#### [MODIFY] [page.tsx](file:///e:/gst-app/gst/app/page.tsx)

- Add "Print Summary" button in Summary tab
- Render PrintSummary component in hidden print area

---

## 7. CSV File Support

**Complexity:** Low | **Files:** 2

Accept CSV files with the same column format as Excel.

#### [MODIFY] [file-dropzone.tsx](file:///e:/gst-app/gst/components/file-dropzone.tsx)

- Update accepted file types to include `.csv`
- Update UI text to mention CSV support

#### [MODIFY] [excel-processor.ts](file:///e:/gst-app/gst/lib/services/excel-processor.ts)

- Detect file type from extension
- For CSV: Use XLSX.read with proper options
- XLSX library already supports CSV parsing

---

## Implementation Order (Recommended)

| Priority | Feature | Reason |
|----------|---------|--------|
| 1 | Dark/Light Mode Toggle | Quick win, improves UX |
| 2 | Duplicate Detection | Simple validation addition |
| 3 | CSV Support | Minimal code change |
| 4 | Template with Sample Data | Excel work, no code |
| 5 | Print Summary | Standalone component |
| 6 | Multi-File Support | Medium complexity |
| 7 | Inline Error Editing | Most complex, do last |

---

## Verification Plan

### For Each Feature:
1. Manual testing with sample data
2. Edge case testing (empty files, invalid data)
3. Browser testing (Chrome, Firefox, Edge)

### Automated Tests:
- Unit tests for duplicate detection logic
- Unit tests for CSV parsing
