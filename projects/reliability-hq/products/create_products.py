#!/usr/bin/env python3
"""
Reliability HQ Digital Products Generator
Creates professional RCM templates following SAE JA1011 and Moubray methodology
"""

import os
from openpyxl import Workbook
from openpyxl.styles import Font, Fill, PatternFill, Border, Side, Alignment, Protection
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import FormulaRule, ColorScaleRule
from openpyxl.chart import BarChart, Reference
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.comments import Comment

# Brand colours
DEEP_TEAL = "0D6E6E"
LIGHT_GREY = "E9ECEF"
INDUSTRIAL_AMBER = "E67E22"
WHITE = "FFFFFF"

# Styles
header_fill = PatternFill(start_color=DEEP_TEAL, end_color=DEEP_TEAL, fill_type="solid")
header_font = Font(bold=True, color=WHITE, size=11)
alt_row_fill = PatternFill(start_color=LIGHT_GREY, end_color=LIGHT_GREY, fill_type="solid")
accent_fill = PatternFill(start_color=INDUSTRIAL_AMBER, end_color=INDUSTRIAL_AMBER, fill_type="solid")
accent_font = Font(bold=True, color=WHITE)
thin_border = Border(
    left=Side(style='thin', color='CCCCCC'),
    right=Side(style='thin', color='CCCCCC'),
    top=Side(style='thin', color='CCCCCC'),
    bottom=Side(style='thin', color='CCCCCC')
)
wrap_alignment = Alignment(wrap_text=True, vertical='top')
center_alignment = Alignment(horizontal='center', vertical='center')

FOOTER_TEXT = "© 2026 Reliability HQ | reliabilityhq.com"

def apply_header_style(ws, row=1, start_col=1, end_col=None):
    """Apply header styling to a row"""
    if end_col is None:
        end_col = ws.max_column
    for col in range(start_col, end_col + 1):
        cell = ws.cell(row=row, column=col)
        cell.fill = header_fill
        cell.font = header_font
        cell.border = thin_border
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)

def apply_alternating_rows(ws, start_row=2, end_row=None, start_col=1, end_col=None):
    """Apply alternating row colours"""
    if end_row is None:
        end_row = ws.max_row
    if end_col is None:
        end_col = ws.max_column
    for row in range(start_row, end_row + 1):
        for col in range(start_col, end_col + 1):
            cell = ws.cell(row=row, column=col)
            cell.border = thin_border
            cell.alignment = wrap_alignment
            if row % 2 == 0:
                cell.fill = alt_row_fill

def add_footer(ws, row, col_span=5):
    """Add footer to worksheet"""
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=col_span)
    cell = ws.cell(row=row, column=1)
    cell.value = FOOTER_TEXT
    cell.font = Font(italic=True, color='666666', size=9)
    cell.alignment = Alignment(horizontal='center')

def set_column_widths(ws, widths):
    """Set column widths from a dict {column_letter: width}"""
    for col, width in widths.items():
        ws.column_dimensions[col].width = width

# ============================================================================
# PRODUCT 1: RCM FMEA Template Pack
# ============================================================================
def create_fmea_template():
    """Create the RCM FMEA Template Pack"""
    wb = Workbook()
    
    # ----- Sheet 1: Instructions -----
    ws_inst = wb.active
    ws_inst.title = "Instructions"
    
    instructions = [
        ("RCM FMEA Template Pack", "header"),
        ("", ""),
        ("Welcome to the Reliability HQ FMEA Template Pack. This workbook follows SAE JA1011 and Moubray's RCM II methodology.", ""),
        ("", ""),
        ("SHEETS IN THIS WORKBOOK:", "subheader"),
        ("1. FMEA Worksheet - Main analysis sheet for documenting failure modes and effects", ""),
        ("2. Function List - Define equipment functions with performance standards", ""),
        ("3. Failure Mode Library - Reference library of common failure modes by equipment type", ""),
        ("", ""),
        ("HOW TO USE:", "subheader"),
        ("Step 1: Define the asset boundary and operating context", ""),
        ("Step 2: List all functions in the Function List sheet", ""),
        ("Step 3: For each function, identify functional failures and failure modes", ""),
        ("Step 4: Document failure effects and consequences in the FMEA Worksheet", ""),
        ("Step 5: Use the RCM Decision Diagram to select appropriate tasks", ""),
        ("", ""),
        ("COLUMN DEFINITIONS:", "subheader"),
        ("Function: What the equipment is expected to do (include performance standard)", ""),
        ("Functional Failure: How the function can fail to be fulfilled", ""),
        ("Failure Mode: The specific mechanism or cause of the functional failure", ""),
        ("Failure Effect: What happens when the failure mode occurs (local and system)", ""),
        ("Consequence: Safety (S), Environmental (E), Operational (O), or Non-operational (N)", ""),
        ("Current Controls: Existing maintenance or operational tasks", ""),
        ("Recommended Task: Proactive task from RCM decision logic", ""),
        ("Task Interval: Frequency or condition for task execution", ""),
        ("Responsibility: Role or department responsible for task execution", ""),
        ("", ""),
        ("TIPS:", "subheader"),
        ("• Be specific about performance standards (e.g., 'pump at 500 L/min' not just 'pump water')", ""),
        ("• Each function should have at least one functional failure", ""),
        ("• Each functional failure should have at least one failure mode", ""),
        ("• Use the Failure Mode Library for common examples and inspiration", ""),
        ("• Involve operators, maintainers, and engineers in the analysis", ""),
        ("", ""),
        ("REFERENCE STANDARDS:", "subheader"),
        ("• SAE JA1011 - Evaluation Criteria for RCM Processes", ""),
        ("• SAE JA1012 - A Guide to the RCM Standard", ""),
        ("• Moubray, J. (1997) Reliability-centred Maintenance (RCM II)", ""),
    ]
    
    for i, (text, style) in enumerate(instructions, 1):
        cell = ws_inst.cell(row=i, column=1)
        cell.value = text
        if style == "header":
            cell.font = Font(bold=True, size=16, color=DEEP_TEAL)
        elif style == "subheader":
            cell.font = Font(bold=True, size=12, color=DEEP_TEAL)
        else:
            cell.font = Font(size=11)
    
    ws_inst.column_dimensions['A'].width = 100
    add_footer(ws_inst, len(instructions) + 3, 1)
    
    # ----- Sheet 2: FMEA Worksheet -----
    ws_fmea = wb.create_sheet("FMEA Worksheet")
    
    # Header row
    fmea_headers = [
        "Ref", "Asset/System", "Function", "Functional Failure", 
        "Failure Mode", "Failure Effect", "Consequence", "Current Controls",
        "Recommended Task", "Task Type", "Interval", "Responsibility", "Notes"
    ]
    
    for col, header in enumerate(fmea_headers, 1):
        ws_fmea.cell(row=1, column=col, value=header)
    
    apply_header_style(ws_fmea, row=1, end_col=len(fmea_headers))
    
    # Example data - Centrifugal Pump
    example_data = [
        ["1.1", "Cooling Water Pump P-101", "Transfer cooling water from sump to heat exchangers at 500 L/min minimum, at 4-6 bar discharge pressure",
         "Unable to pump water", "Impeller wear", 
         "Gradual reduction in flow rate and discharge pressure. Overheating of downstream equipment within 30 minutes. Production stoppage required.",
         "O", "Monthly vibration monitoring", "On-Condition Task", "CBM", "Monthly", "Reliability Team", "P-F interval ~3 months"],
        
        ["1.2", "Cooling Water Pump P-101", "Transfer cooling water from sump to heat exchangers at 500 L/min minimum, at 4-6 bar discharge pressure",
         "Unable to pump water", "Mechanical seal failure",
         "Water leak at seal face. Puddle forming under pump. If undetected, bearing damage within 2-4 hours.",
         "O", "Operator rounds (visual)", "On-Condition Task", "CBM", "Daily", "Operations", "Install drip tray with level sensor"],
        
        ["1.3", "Cooling Water Pump P-101", "Transfer cooling water from sump to heat exchangers at 500 L/min minimum, at 4-6 bar discharge pressure",
         "Unable to pump water", "Motor bearing failure",
         "Increased noise and vibration. If run to failure, motor seizure and unplanned downtime of 8-12 hours.",
         "O", "Vibration analysis", "On-Condition Task", "CBM", "Monthly", "Reliability Team", "Trend overall velocity"],
        
        ["1.4", "Cooling Water Pump P-101", "Transfer cooling water from sump to heat exchangers at 500 L/min minimum, at 4-6 bar discharge pressure",
         "Unable to pump water", "Coupling failure",
         "Sudden loss of power transmission. Immediate pump stoppage. Requires 4-hour repair.",
         "O", "Visual inspection", "On-Condition Task", "CBM", "Quarterly", "Maintenance", "Check for rubber debris"],
        
        ["2.1", "Cooling Water Pump P-101", "Contain pumped fluid (no external leakage)",
         "External leakage exceeds acceptable limits", "Casing gasket degradation",
         "Water seeping at flange faces. Environmental/housekeeping issue. Potential slip hazard.",
         "N", "Operator rounds", "On-Condition Task", "CBM", "Daily", "Operations", "Replace gasket at overhaul"],
        
        ["3.1", "Cooling Water Pump P-101", "Protect system from overpressure (PSV-101 relieves at 8 bar)",
         "PSV fails to open at setpoint", "PSV spring fatigue/corrosion",
         "System overpressure possible. Heat exchanger tube rupture risk. Safety consequence.",
         "S", "None", "Scheduled Restoration", "TBR", "5 years", "Instrument Tech", "Statutory requirement"],
    ]
    
    for row_idx, row_data in enumerate(example_data, 2):
        for col_idx, value in enumerate(row_data, 1):
            ws_fmea.cell(row=row_idx, column=col_idx, value=value)
    
    # Add empty rows for user input
    for row in range(len(example_data) + 2, len(example_data) + 52):
        for col in range(1, len(fmea_headers) + 1):
            ws_fmea.cell(row=row, column=col, value="")
    
    apply_alternating_rows(ws_fmea, start_row=2, end_row=len(example_data) + 51, end_col=len(fmea_headers))
    
    # Data validation for Consequence column
    dv_consequence = DataValidation(type="list", formula1='"S,E,O,N"', allow_blank=True)
    dv_consequence.error = "Please select S (Safety), E (Environmental), O (Operational), or N (Non-operational)"
    dv_consequence.errorTitle = "Invalid Consequence"
    ws_fmea.add_data_validation(dv_consequence)
    dv_consequence.add(f'G2:G100')
    
    # Data validation for Task Type
    dv_task = DataValidation(type="list", formula1='"CBM,TBR,TBD,FF,RTF,OTC,Redesign"', allow_blank=True)
    dv_task.error = "Select: CBM (Condition-Based), TBR (Time-Based Restoration), TBD (Time-Based Discard), FF (Failure Finding), RTF (Run to Failure), OTC (One-Time Change), Redesign"
    dv_task.errorTitle = "Invalid Task Type"
    ws_fmea.add_data_validation(dv_task)
    dv_task.add(f'J2:J100')
    
    # Column widths
    set_column_widths(ws_fmea, {
        'A': 8, 'B': 25, 'C': 40, 'D': 25, 'E': 25, 'F': 45, 
        'G': 12, 'H': 25, 'I': 25, 'J': 12, 'K': 12, 'L': 18, 'M': 30
    })
    
    # Freeze panes
    ws_fmea.freeze_panes = 'D2'
    
    add_footer(ws_fmea, 105, len(fmea_headers))
    
    # ----- Sheet 3: Function List -----
    ws_func = wb.create_sheet("Function List")
    
    func_headers = ["Ref", "Asset/System", "Function Statement", "Performance Standard", 
                    "Operating Context Notes", "Primary/Secondary"]
    
    for col, header in enumerate(func_headers, 1):
        ws_func.cell(row=1, column=col, value=header)
    
    apply_header_style(ws_func, row=1, end_col=len(func_headers))
    
    # Example functions
    func_examples = [
        ["1", "Cooling Water Pump P-101", "Transfer cooling water from sump to heat exchangers", 
         "500 L/min minimum flow, 4-6 bar discharge pressure", 
         "Continuous operation 24/7. Ambient temp 15-35°C. Water quality: treated, pH 7-8", "Primary"],
        ["2", "Cooling Water Pump P-101", "Contain pumped fluid", 
         "No visible external leakage", "", "Primary"],
        ["3", "Cooling Water Pump P-101", "Protect system from overpressure", 
         "PSV-101 relieves at 8 bar, reseats by 7.2 bar", "Statutory requirement BS EN ISO 4126", "Secondary"],
        ["4", "Cooling Water Pump P-101", "Allow isolation for maintenance", 
         "Inlet/outlet valves isolate within 30 seconds", "", "Secondary"],
    ]
    
    for row_idx, row_data in enumerate(func_examples, 2):
        for col_idx, value in enumerate(row_data, 1):
            ws_func.cell(row=row_idx, column=col_idx, value=value)
    
    # Empty rows
    for row in range(len(func_examples) + 2, 52):
        for col in range(1, len(func_headers) + 1):
            ws_func.cell(row=row, column=col, value="")
    
    apply_alternating_rows(ws_func, start_row=2, end_row=51, end_col=len(func_headers))
    
    # Data validation
    dv_type = DataValidation(type="list", formula1='"Primary,Secondary,Protective"', allow_blank=True)
    ws_func.add_data_validation(dv_type)
    dv_type.add('F2:F100')
    
    set_column_widths(ws_func, {'A': 8, 'B': 30, 'C': 50, 'D': 40, 'E': 40, 'F': 18})
    add_footer(ws_func, 55, len(func_headers))
    
    # ----- Sheet 4: Failure Mode Library -----
    ws_lib = wb.create_sheet("Failure Mode Library")
    
    lib_headers = ["Equipment Type", "Component", "Failure Mode", "Typical Cause", 
                   "Detection Method", "Typical P-F Interval"]
    
    for col, header in enumerate(lib_headers, 1):
        ws_lib.cell(row=1, column=col, value=header)
    
    apply_header_style(ws_lib, row=1, end_col=len(lib_headers))
    
    # Library entries
    library_data = [
        # Pumps
        ["Centrifugal Pump", "Impeller", "Wear/Erosion", "Abrasive particles, cavitation", "Vibration analysis, flow/pressure trending", "1-6 months"],
        ["Centrifugal Pump", "Impeller", "Corrosion", "Incompatible materials, aggressive fluid", "Inspection at overhaul, performance degradation", "6-24 months"],
        ["Centrifugal Pump", "Mechanical Seal", "Face wear", "Normal wear, contamination, misalignment", "Visual (leakage), seal pressure trending", "1-4 weeks"],
        ["Centrifugal Pump", "Mechanical Seal", "Elastomer degradation", "Chemical attack, temperature cycling", "Visual inspection", "N/A (sudden)"],
        ["Centrifugal Pump", "Bearings", "Fatigue spalling", "Normal wear, overload, contamination", "Vibration analysis (bearing frequencies)", "1-3 months"],
        ["Centrifugal Pump", "Bearings", "Lubrication breakdown", "Insufficient lube, wrong grade, contamination", "Oil analysis, temperature monitoring", "1-4 weeks"],
        ["Centrifugal Pump", "Coupling", "Elastomer degradation", "Age, heat, chemical exposure", "Visual inspection (debris)", "N/A (inspect monthly)"],
        ["Centrifugal Pump", "Baseplate/Foundation", "Loosening", "Vibration, thermal cycling", "Visual inspection, levelling check", "N/A"],
        
        # Motors
        ["Electric Motor", "Stator winding", "Insulation breakdown", "Age, overheating, contamination, voltage spikes", "Insulation resistance testing, partial discharge", "Months"],
        ["Electric Motor", "Stator winding", "Turn-to-turn short", "Contamination, mechanical damage", "Motor current signature analysis", "Weeks to months"],
        ["Electric Motor", "Rotor", "Broken rotor bars", "Thermal stress, manufacturing defect", "Motor current signature analysis", "Months"],
        ["Electric Motor", "Bearings", "Fatigue/wear", "Normal wear, misalignment, overload", "Vibration analysis", "1-3 months"],
        ["Electric Motor", "Bearings", "Electrical fluting", "VFD-induced shaft currents", "Vibration analysis (characteristic frequencies)", "1-6 months"],
        ["Electric Motor", "Cooling fan", "Blade damage/loss", "Fatigue, impact", "Visual inspection, motor temperature", "N/A"],
        
        # Valves
        ["Control Valve", "Packing", "Leakage", "Wear, hardening, stem damage", "Visual inspection", "N/A"],
        ["Control Valve", "Seat/Plug", "Erosion", "Cavitation, flashing, particulates", "Control loop performance, valve position trending", "Weeks to months"],
        ["Control Valve", "Actuator diaphragm", "Rupture", "Age, pressure cycling, chemical attack", "Position response testing", "N/A (sudden)"],
        ["Control Valve", "Positioner", "Calibration drift", "Vibration, contamination, electronics", "Control loop performance", "Months"],
        
        ["Ball Valve", "Seats", "Leakage", "Wear, contamination, damage from operation", "Leakage test (isolation)", "N/A"],
        ["Ball Valve", "Stem seal", "External leakage", "Wear, over-torquing, corrosion", "Visual inspection", "N/A"],
        
        # Heat Exchangers
        ["Shell & Tube HX", "Tubes", "Fouling", "Scaling, biological growth, particulates", "Process parameters (ΔT, ΔP)", "Weeks to months"],
        ["Shell & Tube HX", "Tubes", "Corrosion", "Incompatible materials, galvanic, erosion-corrosion", "Tube inspection, eddy current", "Months to years"],
        ["Shell & Tube HX", "Tubes", "Tube leak", "Corrosion, erosion, vibration fatigue", "Helium leak test, process contamination", "N/A (sudden)"],
        ["Shell & Tube HX", "Gaskets", "Leakage", "Age, thermal cycling, over/under torque", "Visual inspection", "N/A"],
        
        # Instrumentation
        ["Pressure Transmitter", "Sensing element", "Drift", "Age, process conditions, overpressure events", "Calibration check", "6-24 months"],
        ["Pressure Transmitter", "Impulse line", "Blockage", "Fouling, freezing, product solidification", "Process deviation, comparison with redundant", "Variable"],
        ["Temperature Transmitter", "RTD/Thermocouple", "Drift", "Age, contamination, mechanical damage", "Calibration check, cross-comparison", "6-24 months"],
        ["Level Transmitter", "Sensing element", "Fouling/coating", "Process buildup on sensor", "Process deviation, inspection", "Variable"],
        
        # Compressors
        ["Reciprocating Compressor", "Piston rings", "Wear", "Normal wear, contamination, improper lubrication", "Capacity test, interstage pressures", "Months"],
        ["Reciprocating Compressor", "Valves", "Leakage/breakage", "Fatigue, contamination, liquid carryover", "Valve temperature monitoring, capacity test", "Weeks to months"],
        ["Centrifugal Compressor", "Seals", "Wear/degradation", "Normal wear, contamination", "Seal gas consumption, process gas leak detection", "Weeks to months"],
        ["Centrifugal Compressor", "Bearings", "Wear/damage", "Overload, misalignment, lube issues", "Vibration, bearing temperature", "1-3 months"],
        
        # Gearboxes
        ["Gearbox", "Gears", "Tooth wear", "Normal wear, misalignment, overload", "Oil analysis (wear metals), vibration (gear mesh)", "1-6 months"],
        ["Gearbox", "Gears", "Pitting/spalling", "Fatigue, overload", "Vibration analysis, oil analysis", "1-6 months"],
        ["Gearbox", "Bearings", "Wear/fatigue", "Normal wear, contamination, misalignment", "Vibration analysis, oil analysis", "1-3 months"],
        ["Gearbox", "Seals", "Leakage", "Age, wear, shaft damage", "Visual inspection", "N/A"],
        ["Gearbox", "Oil", "Degradation", "Age, oxidation, contamination, overheating", "Oil analysis (viscosity, TAN, water)", "N/A (trend)"],
    ]
    
    for row_idx, row_data in enumerate(library_data, 2):
        for col_idx, value in enumerate(row_data, 1):
            ws_lib.cell(row=row_idx, column=col_idx, value=value)
    
    apply_alternating_rows(ws_lib, start_row=2, end_row=len(library_data) + 1, end_col=len(lib_headers))
    
    set_column_widths(ws_lib, {'A': 25, 'B': 20, 'C': 25, 'D': 40, 'E': 40, 'F': 18})
    ws_lib.freeze_panes = 'A2'
    
    add_footer(ws_lib, len(library_data) + 5, len(lib_headers))
    
    # Save
    wb.save('/Users/villanelle/.openclaw/workspace/projects/reliability-hq/products/RCM-FMEA-Template-Pack.xlsx')
    print("✓ Created: RCM-FMEA-Template-Pack.xlsx")

# ============================================================================
# PRODUCT 2: Criticality Analysis Calculator
# ============================================================================
def create_criticality_calculator():
    """Create the Criticality Analysis Calculator"""
    wb = Workbook()
    
    # ----- Sheet 1: Instructions -----
    ws_inst = wb.active
    ws_inst.title = "Instructions"
    
    instructions = [
        ("Criticality Analysis Calculator", "header"),
        ("", ""),
        ("This workbook calculates equipment criticality scores using a weighted multi-criteria approach.", ""),
        ("Use it to prioritise assets for RCM analysis, spare parts stocking, and maintenance strategy.", ""),
        ("", ""),
        ("SHEETS IN THIS WORKBOOK:", "subheader"),
        ("1. Criteria Definitions - Scoring guidelines and criteria weights (customisable)", ""),
        ("2. Equipment Input - Enter your equipment and score each criterion", ""),
        ("3. Dashboard - View ranked results and charts", ""),
        ("", ""),
        ("HOW TO USE:", "subheader"),
        ("Step 1: Review and customise the Criteria Definitions (optional)", ""),
        ("Step 2: Adjust the criteria weights if needed (must sum to 100%)", ""),
        ("Step 3: Enter your equipment in the Equipment Input sheet", ""),
        ("Step 4: Score each criterion from 1 (lowest) to 5 (highest)", ""),
        ("Step 5: Review the results on the Dashboard", ""),
        ("", ""),
        ("CRITERIA EXPLAINED:", "subheader"),
        ("Safety: Potential for injury or fatality if equipment fails", ""),
        ("Environmental: Potential for spills, emissions, or environmental damage", ""),
        ("Production: Impact on output, throughput, or revenue if equipment fails", ""),
        ("Cost: Direct repair/replacement cost and consequential costs", ""),
        ("", ""),
        ("SCORING GUIDE:", "subheader"),
        ("1 = Negligible impact", ""),
        ("2 = Minor impact, easily managed", ""),
        ("3 = Moderate impact, some effort to manage", ""),
        ("4 = Significant impact, substantial effort/cost", ""),
        ("5 = Severe/catastrophic impact", ""),
        ("", ""),
        ("See the Criteria Definitions sheet for detailed scoring guidelines.", ""),
    ]
    
    for i, (text, style) in enumerate(instructions, 1):
        cell = ws_inst.cell(row=i, column=1)
        cell.value = text
        if style == "header":
            cell.font = Font(bold=True, size=16, color=DEEP_TEAL)
        elif style == "subheader":
            cell.font = Font(bold=True, size=12, color=DEEP_TEAL)
        else:
            cell.font = Font(size=11)
    
    ws_inst.column_dimensions['A'].width = 90
    add_footer(ws_inst, len(instructions) + 3, 1)
    
    # ----- Sheet 2: Criteria Definitions -----
    ws_crit = wb.create_sheet("Criteria Definitions")
    
    # Title
    ws_crit['A1'] = "CRITICALITY SCORING CRITERIA"
    ws_crit['A1'].font = Font(bold=True, size=14, color=DEEP_TEAL)
    
    # Criteria weights section
    ws_crit['A3'] = "CRITERIA WEIGHTS (adjust to suit your priorities)"
    ws_crit['A3'].font = Font(bold=True, size=12)
    
    weights = [
        ("Criterion", "Weight (%)", "Description"),
        ("Safety", 30, "Risk of injury or fatality"),
        ("Environmental", 20, "Risk of environmental harm"),
        ("Production", 35, "Impact on production/revenue"),
        ("Cost", 15, "Direct and consequential costs"),
    ]
    
    for i, (crit, weight, desc) in enumerate(weights):
        row = 4 + i
        ws_crit.cell(row=row, column=1, value=crit)
        ws_crit.cell(row=row, column=2, value=weight if isinstance(weight, int) else weight)
        ws_crit.cell(row=row, column=3, value=desc)
        if i == 0:
            for col in range(1, 4):
                ws_crit.cell(row=row, column=col).fill = header_fill
                ws_crit.cell(row=row, column=col).font = header_font
        else:
            for col in range(1, 4):
                ws_crit.cell(row=row, column=col).border = thin_border
    
    # Weight validation note
    ws_crit['A10'] = "Note: Weights should sum to 100%"
    ws_crit['A10'].font = Font(italic=True, color='666666')
    ws_crit['B10'] = '=SUM(B5:B8)'
    ws_crit['B10'].font = Font(bold=True)
    
    # Scoring definitions
    criteria_scores = [
        ("SAFETY SCORING", 13, [
            (1, "No safety impact"),
            (2, "Minor first aid injury possible"),
            (3, "Lost time injury possible"),
            (4, "Serious injury or permanent disability possible"),
            (5, "Fatality or multiple serious injuries possible"),
        ]),
        ("ENVIRONMENTAL SCORING", 21, [
            (1, "No environmental impact"),
            (2, "Minor contained release, easy cleanup"),
            (3, "Moderate release, reportable incident"),
            (4, "Significant release, regulatory action likely"),
            (5, "Major release, lasting environmental damage"),
        ]),
        ("PRODUCTION SCORING", 29, [
            (1, "No production impact"),
            (2, "Minor delay (<1 hour), no output loss"),
            (3, "Moderate impact (1-8 hours downtime)"),
            (4, "Significant impact (8-48 hours downtime)"),
            (5, "Severe impact (>48 hours or plant-wide effect)"),
        ]),
        ("COST SCORING", 37, [
            (1, "< £1,000"),
            (2, "£1,000 - £10,000"),
            (3, "£10,000 - £50,000"),
            (4, "£50,000 - £250,000"),
            (5, "> £250,000"),
        ]),
    ]
    
    for title, start_row, scores in criteria_scores:
        ws_crit.cell(row=start_row, column=1, value=title)
        ws_crit.cell(row=start_row, column=1).font = Font(bold=True, size=12, color=DEEP_TEAL)
        
        ws_crit.cell(row=start_row + 1, column=1, value="Score")
        ws_crit.cell(row=start_row + 1, column=2, value="Definition")
        for col in range(1, 3):
            ws_crit.cell(row=start_row + 1, column=col).fill = alt_row_fill
            ws_crit.cell(row=start_row + 1, column=col).font = Font(bold=True)
            ws_crit.cell(row=start_row + 1, column=col).border = thin_border
        
        for i, (score, definition) in enumerate(scores, 2):
            ws_crit.cell(row=start_row + i, column=1, value=score)
            ws_crit.cell(row=start_row + i, column=2, value=definition)
            ws_crit.cell(row=start_row + i, column=1).border = thin_border
            ws_crit.cell(row=start_row + i, column=2).border = thin_border
            ws_crit.cell(row=start_row + i, column=1).alignment = center_alignment
    
    set_column_widths(ws_crit, {'A': 25, 'B': 50, 'C': 40})
    add_footer(ws_crit, 50, 3)
    
    # ----- Sheet 3: Equipment Input -----
    ws_equip = wb.create_sheet("Equipment Input")
    
    equip_headers = ["Equipment Tag", "Equipment Name", "Area/System", "Safety\n(1-5)", 
                     "Environmental\n(1-5)", "Production\n(1-5)", "Cost\n(1-5)", 
                     "Weighted Score", "Rank", "Criticality"]
    
    for col, header in enumerate(equip_headers, 1):
        ws_equip.cell(row=1, column=col, value=header)
    
    apply_header_style(ws_equip, row=1, end_col=len(equip_headers))
    
    # Example equipment
    example_equip = [
        ["P-101", "Main Feed Pump", "Process", 2, 2, 5, 4],
        ["P-102", "Backup Feed Pump", "Process", 2, 2, 2, 4],
        ["C-101", "Product Compressor", "Compression", 4, 3, 5, 5],
        ["E-101", "Process Heat Exchanger", "Heat Transfer", 3, 4, 4, 3],
        ["T-101", "Feed Tank", "Storage", 3, 5, 3, 3],
        ["V-101", "Pressure Relief Valve", "Safety", 5, 4, 2, 2],
        ["M-101", "Conveyor Drive Motor", "Material Handling", 2, 1, 4, 3],
        ["FT-101", "Flow Transmitter", "Instrumentation", 1, 1, 3, 2],
        ["LCV-101", "Level Control Valve", "Control", 2, 3, 4, 2],
        ["G-101", "Emergency Generator", "Utilities", 5, 2, 5, 4],
    ]
    
    for row_idx, row_data in enumerate(example_equip, 2):
        for col_idx, value in enumerate(row_data, 1):
            ws_equip.cell(row=row_idx, column=col_idx, value=value)
        
        # Weighted score formula (referencing weights in Criteria Definitions)
        row = row_idx
        ws_equip.cell(row=row, column=8).value = f"=D{row}*'Criteria Definitions'!$B$5/100+E{row}*'Criteria Definitions'!$B$6/100+F{row}*'Criteria Definitions'!$B$7/100+G{row}*'Criteria Definitions'!$B$8/100"
        ws_equip.cell(row=row, column=8).number_format = '0.00'
        
        # Rank formula
        ws_equip.cell(row=row, column=9).value = f'=RANK(H{row},$H$2:$H$101,0)'
        
        # Criticality category
        ws_equip.cell(row=row, column=10).value = f'=IF(H{row}>=4,"Critical",IF(H{row}>=3,"High",IF(H{row}>=2,"Medium","Low")))'
    
    # Add empty rows with formulas
    for row in range(len(example_equip) + 2, 52):
        for col in range(1, 8):
            ws_equip.cell(row=row, column=col, value="")
        # Formulas for empty rows (will show 0 or error for blank)
        ws_equip.cell(row=row, column=8).value = f"=IF(D{row}=\"\",\"\",D{row}*'Criteria Definitions'!$B$5/100+E{row}*'Criteria Definitions'!$B$6/100+F{row}*'Criteria Definitions'!$B$7/100+G{row}*'Criteria Definitions'!$B$8/100)"
        ws_equip.cell(row=row, column=8).number_format = '0.00'
        ws_equip.cell(row=row, column=9).value = f'=IF(H{row}="","",RANK(H{row},$H$2:$H$101,0))'
        ws_equip.cell(row=row, column=10).value = f'=IF(H{row}="","",IF(H{row}>=4,"Critical",IF(H{row}>=3,"High",IF(H{row}>=2,"Medium","Low"))))'
    
    apply_alternating_rows(ws_equip, start_row=2, end_row=51, end_col=len(equip_headers))
    
    # Data validation for scores
    dv_score = DataValidation(type="whole", operator="between", formula1="1", formula2="5")
    dv_score.error = "Score must be between 1 and 5"
    dv_score.errorTitle = "Invalid Score"
    ws_equip.add_data_validation(dv_score)
    dv_score.add('D2:G100')
    
    # Conditional formatting for criticality
    from openpyxl.formatting.rule import CellIsRule
    ws_equip.conditional_formatting.add('J2:J100', 
        CellIsRule(operator='equal', formula=['"Critical"'], fill=PatternFill(start_color='FF6B6B', end_color='FF6B6B', fill_type='solid')))
    ws_equip.conditional_formatting.add('J2:J100', 
        CellIsRule(operator='equal', formula=['"High"'], fill=PatternFill(start_color='FFB347', end_color='FFB347', fill_type='solid')))
    ws_equip.conditional_formatting.add('J2:J100', 
        CellIsRule(operator='equal', formula=['"Medium"'], fill=PatternFill(start_color='FFEB99', end_color='FFEB99', fill_type='solid')))
    ws_equip.conditional_formatting.add('J2:J100', 
        CellIsRule(operator='equal', formula=['"Low"'], fill=PatternFill(start_color='90EE90', end_color='90EE90', fill_type='solid')))
    
    set_column_widths(ws_equip, {'A': 15, 'B': 30, 'C': 20, 'D': 12, 'E': 14, 'F': 14, 'G': 12, 'H': 15, 'I': 8, 'J': 12})
    ws_equip.freeze_panes = 'D2'
    
    add_footer(ws_equip, 55, len(equip_headers))
    
    # ----- Sheet 4: Dashboard -----
    ws_dash = wb.create_sheet("Dashboard")
    
    # Title
    ws_dash['A1'] = "CRITICALITY ANALYSIS DASHBOARD"
    ws_dash['A1'].font = Font(bold=True, size=16, color=DEEP_TEAL)
    
    # Summary stats
    ws_dash['A3'] = "SUMMARY"
    ws_dash['A3'].font = Font(bold=True, size=12, color=DEEP_TEAL)
    
    summary_data = [
        ("Total Equipment Analysed:", '=COUNTA(\'Equipment Input\'!A2:A100)'),
        ("Critical Assets:", '=COUNTIF(\'Equipment Input\'!J2:J100,"Critical")'),
        ("High Priority Assets:", '=COUNTIF(\'Equipment Input\'!J2:J100,"High")'),
        ("Medium Priority Assets:", '=COUNTIF(\'Equipment Input\'!J2:J100,"Medium")'),
        ("Low Priority Assets:", '=COUNTIF(\'Equipment Input\'!J2:J100,"Low")'),
        ("Average Criticality Score:", '=AVERAGE(\'Equipment Input\'!H2:H100)'),
    ]
    
    for i, (label, formula) in enumerate(summary_data):
        row = 4 + i
        ws_dash.cell(row=row, column=1, value=label)
        ws_dash.cell(row=row, column=1).font = Font(bold=True)
        ws_dash.cell(row=row, column=2, value=formula)
        if "Average" in label:
            ws_dash.cell(row=row, column=2).number_format = '0.00'
    
    # Top 10 Critical Assets
    ws_dash['A12'] = "TOP 10 MOST CRITICAL ASSETS"
    ws_dash['A12'].font = Font(bold=True, size=12, color=DEEP_TEAL)
    
    top10_headers = ["Rank", "Equipment Tag", "Equipment Name", "Score", "Criticality"]
    for col, header in enumerate(top10_headers, 1):
        ws_dash.cell(row=13, column=col, value=header)
    apply_header_style(ws_dash, row=13, end_col=5)
    
    # Top 10 lookup formulas (sorted by score descending)
    for i in range(1, 11):
        row = 13 + i
        ws_dash.cell(row=row, column=1, value=i)
        ws_dash.cell(row=row, column=2).value = f'=IFERROR(INDEX(\'Equipment Input\'!A$2:A$100,MATCH({i},\'Equipment Input\'!I$2:I$100,0)),"")'
        ws_dash.cell(row=row, column=3).value = f'=IFERROR(INDEX(\'Equipment Input\'!B$2:B$100,MATCH({i},\'Equipment Input\'!I$2:I$100,0)),"")'
        ws_dash.cell(row=row, column=4).value = f'=IFERROR(INDEX(\'Equipment Input\'!H$2:H$100,MATCH({i},\'Equipment Input\'!I$2:I$100,0)),"")'
        ws_dash.cell(row=row, column=4).number_format = '0.00'
        ws_dash.cell(row=row, column=5).value = f'=IFERROR(INDEX(\'Equipment Input\'!J$2:J$100,MATCH({i},\'Equipment Input\'!I$2:I$100,0)),"")'
        for col in range(1, 6):
            ws_dash.cell(row=row, column=col).border = thin_border
            if row % 2 == 0:
                ws_dash.cell(row=row, column=col).fill = alt_row_fill
    
    # Add chart
    chart = BarChart()
    chart.type = "bar"
    chart.style = 10
    chart.title = "Top 10 Equipment by Criticality Score"
    chart.y_axis.title = "Equipment"
    chart.x_axis.title = "Criticality Score"
    
    # Data references for chart
    data = Reference(ws_dash, min_col=4, min_row=13, max_row=23)
    cats = Reference(ws_dash, min_col=3, min_row=14, max_row=23)
    chart.add_data(data, titles_from_data=True)
    chart.set_categories(cats)
    chart.shape = 4
    chart.width = 18
    chart.height = 10
    
    ws_dash.add_chart(chart, "G3")
    
    set_column_widths(ws_dash, {'A': 25, 'B': 15, 'C': 30, 'D': 12, 'E': 12})
    add_footer(ws_dash, 30, 5)
    
    # Save
    wb.save('/Users/villanelle/.openclaw/workspace/projects/reliability-hq/products/Criticality-Analysis-Calculator.xlsx')
    print("✓ Created: Criticality-Analysis-Calculator.xlsx")

# ============================================================================
# PRODUCT 3: RCM Decision Diagram Worksheet
# ============================================================================
def create_decision_diagram():
    """Create the RCM Decision Diagram Worksheet"""
    wb = Workbook()
    
    # ----- Sheet 1: Instructions -----
    ws_inst = wb.active
    ws_inst.title = "Instructions"
    
    instructions = [
        ("RCM Decision Diagram Worksheet", "header"),
        ("", ""),
        ("This workbook implements the standard RCM II decision logic developed by John Moubray.", ""),
        ("Use it to systematically select the most appropriate maintenance task for each failure mode.", ""),
        ("", ""),
        ("SHEETS IN THIS WORKBOOK:", "subheader"),
        ("1. Decision Logic - The complete RCM decision tree with explanations", ""),
        ("2. Task Selection Worksheet - Document your decisions for each failure mode", ""),
        ("", ""),
        ("THE RCM DECISION PROCESS:", "subheader"),
        ("For each failure mode, answer the decision questions in sequence:", ""),
        ("", ""),
        ("1. CONSEQUENCE EVALUATION (Questions 1-4)", ""),
        ("   Determine what category of consequence applies:", ""),
        ("   - Hidden failure (protective function)", ""),
        ("   - Safety consequence", ""),
        ("   - Environmental consequence", ""),
        ("   - Operational consequence", ""),
        ("   - Non-operational consequence", ""),
        ("", ""),
        ("2. PROACTIVE TASK SELECTION (Questions H1-H5 / S1-S4 / O1-O4 / N1-N4)", ""),
        ("   For each consequence category, evaluate tasks in order:", ""),
        ("   - On-Condition Task (predictive/condition monitoring)", ""),
        ("   - Scheduled Restoration Task (overhaul/rebuild)", ""),
        ("   - Scheduled Discard Task (replace)", ""),
        ("   - Combination of tasks", ""),
        ("", ""),
        ("3. DEFAULT ACTIONS", ""),
        ("   If no proactive task is applicable:", ""),
        ("   - Hidden failures: Failure-finding task, or redesign if not possible", ""),
        ("   - Safety/Environmental: Redesign is compulsory", ""),
        ("   - Operational: May elect to run to failure if cost-justified", ""),
        ("   - Non-operational: Run to failure is acceptable", ""),
        ("", ""),
        ("KEY TERMS:", "subheader"),
        ("On-Condition: Task detects potential failure (P-F interval)", ""),
        ("Scheduled Restoration: Restore to original capability at fixed intervals", ""),
        ("Scheduled Discard: Replace at fixed intervals", ""),
        ("Failure-Finding: Task to detect hidden failures", ""),
        ("Run to Failure: No scheduled maintenance, repair on failure", ""),
        ("Redesign: Modify equipment, procedures, or training", ""),
        ("", ""),
        ("REFERENCE:", "subheader"),
        ("Moubray, J. (1997) Reliability-centred Maintenance (RCM II), 2nd Edition", ""),
    ]
    
    for i, (text, style) in enumerate(instructions, 1):
        cell = ws_inst.cell(row=i, column=1)
        cell.value = text
        if style == "header":
            cell.font = Font(bold=True, size=16, color=DEEP_TEAL)
        elif style == "subheader":
            cell.font = Font(bold=True, size=12, color=DEEP_TEAL)
        else:
            cell.font = Font(size=11)
    
    ws_inst.column_dimensions['A'].width = 90
    add_footer(ws_inst, len(instructions) + 3, 1)
    
    # ----- Sheet 2: Decision Logic -----
    ws_logic = wb.create_sheet("Decision Logic")
    
    # Title
    ws_logic['A1'] = "RCM II DECISION DIAGRAM"
    ws_logic['A1'].font = Font(bold=True, size=14, color=DEEP_TEAL)
    ws_logic.merge_cells('A1:F1')
    
    # Consequence evaluation section
    ws_logic['A3'] = "CONSEQUENCE EVALUATION"
    ws_logic['A3'].font = Font(bold=True, size=12, color=WHITE)
    ws_logic['A3'].fill = header_fill
    ws_logic.merge_cells('A3:F3')
    
    consequence_questions = [
        ("", "Question", "If YES", "If NO"),
        ("1", "Will the loss of function caused by this failure mode on its own become evident to the operating crew under normal circumstances?", 
         "Go to Q4", "Answer Q2 (Hidden Failure)"),
        ("2", "Does the failure mode cause a loss of function or secondary damage that could hurt or kill someone?",
         "Go to Q3 (Hidden Safety)", "Answer Q3"),
        ("3", "Does the failure mode cause a loss of function or secondary damage that could breach any known environmental standard?",
         "Hidden Environmental consequence → H questions", "Hidden consequence only → H questions"),
        ("4", "Does the failure mode cause a loss of function or secondary damage that could hurt or kill someone?",
         "Safety consequence → S questions", "Go to Q5"),
        ("5", "Does the failure mode cause a loss of function or secondary damage that could breach any known environmental standard?",
         "Environmental consequence → E questions", "Go to Q6"),
        ("6", "Does the failure mode have a direct adverse effect on operational capability?",
         "Operational consequence → O questions", "Non-operational consequence → N questions"),
    ]
    
    for i, row_data in enumerate(consequence_questions):
        row = 4 + i
        for col, value in enumerate(row_data, 1):
            cell = ws_logic.cell(row=row, column=col)
            cell.value = value
            cell.border = thin_border
            cell.alignment = wrap_alignment
            if i == 0:
                cell.fill = alt_row_fill
                cell.font = Font(bold=True)
    
    # Hidden failure questions
    hidden_start = 12
    ws_logic[f'A{hidden_start}'] = "HIDDEN FAILURE TASKS (H)"
    ws_logic[f'A{hidden_start}'].font = Font(bold=True, size=12, color=WHITE)
    ws_logic[f'A{hidden_start}'].fill = PatternFill(start_color='4A4A4A', end_color='4A4A4A', fill_type='solid')
    ws_logic.merge_cells(f'A{hidden_start}:F{hidden_start}')
    
    hidden_questions = [
        ("H1", "Is a scheduled on-condition task technically feasible and worth doing?", "On-Condition Task", "Go to H2"),
        ("H2", "Is a scheduled restoration task technically feasible and worth doing?", "Scheduled Restoration", "Go to H3"),
        ("H3", "Is a scheduled discard task technically feasible and worth doing?", "Scheduled Discard", "Go to H4"),
        ("H4", "Is a combination of tasks technically feasible and worth doing?", "Combination Task", "Go to H5"),
        ("H5", "Is a scheduled failure-finding task technically feasible and worth doing?", "Failure-Finding Task", "Redesign compulsory (if safety) or may accept (if not)"),
    ]
    
    ws_logic.cell(row=hidden_start+1, column=1, value="Ref")
    ws_logic.cell(row=hidden_start+1, column=2, value="Question")
    ws_logic.cell(row=hidden_start+1, column=3, value="If YES")
    ws_logic.cell(row=hidden_start+1, column=4, value="If NO")
    for col in range(1, 5):
        ws_logic.cell(row=hidden_start+1, column=col).fill = alt_row_fill
        ws_logic.cell(row=hidden_start+1, column=col).font = Font(bold=True)
        ws_logic.cell(row=hidden_start+1, column=col).border = thin_border
    
    for i, (ref, question, yes, no) in enumerate(hidden_questions):
        row = hidden_start + 2 + i
        ws_logic.cell(row=row, column=1, value=ref).border = thin_border
        ws_logic.cell(row=row, column=2, value=question).border = thin_border
        ws_logic.cell(row=row, column=3, value=yes).border = thin_border
        ws_logic.cell(row=row, column=4, value=no).border = thin_border
        for col in range(1, 5):
            ws_logic.cell(row=row, column=col).alignment = wrap_alignment
    
    # Safety/Environmental/Operational questions (similar pattern)
    categories = [
        ("SAFETY/ENVIRONMENTAL CONSEQUENCE TASKS (S/E)", '8B0000', 20, [
            ("S1/E1", "Is a scheduled on-condition task technically feasible and worth doing?", "On-Condition Task", "Go to S2/E2"),
            ("S2/E2", "Is a scheduled restoration task technically feasible and worth doing?", "Scheduled Restoration", "Go to S3/E3"),
            ("S3/E3", "Is a scheduled discard task technically feasible and worth doing?", "Scheduled Discard", "Go to S4/E4"),
            ("S4/E4", "Is a combination of tasks technically feasible and worth doing?", "Combination Task", "Redesign is COMPULSORY"),
        ]),
        ("OPERATIONAL CONSEQUENCE TASKS (O)", INDUSTRIAL_AMBER, 28, [
            ("O1", "Is a scheduled on-condition task technically feasible and worth doing?", "On-Condition Task", "Go to O2"),
            ("O2", "Is a scheduled restoration task technically feasible and worth doing?", "Scheduled Restoration", "Go to O3"),
            ("O3", "Is a scheduled discard task technically feasible and worth doing?", "Scheduled Discard", "Go to O4"),
            ("O4", "Is a combination of tasks technically feasible and worth doing?", "Combination Task", "No scheduled maintenance (evaluate economics of redesign vs failure)"),
        ]),
        ("NON-OPERATIONAL CONSEQUENCE TASKS (N)", DEEP_TEAL, 36, [
            ("N1", "Is a scheduled on-condition task technically feasible and worth doing?", "On-Condition Task", "Go to N2"),
            ("N2", "Is a scheduled restoration task technically feasible and worth doing?", "Scheduled Restoration", "Go to N3"),
            ("N3", "Is a scheduled discard task technically feasible and worth doing?", "Scheduled Discard", "Go to N4"),
            ("N4", "Is a combination of tasks technically feasible and worth doing?", "Combination Task", "No scheduled maintenance (run to failure acceptable)"),
        ]),
    ]
    
    for title, color, start_row, questions in categories:
        ws_logic[f'A{start_row}'] = title
        ws_logic[f'A{start_row}'].font = Font(bold=True, size=12, color=WHITE)
        ws_logic[f'A{start_row}'].fill = PatternFill(start_color=color, end_color=color, fill_type='solid')
        ws_logic.merge_cells(f'A{start_row}:F{start_row}')
        
        ws_logic.cell(row=start_row+1, column=1, value="Ref")
        ws_logic.cell(row=start_row+1, column=2, value="Question")
        ws_logic.cell(row=start_row+1, column=3, value="If YES")
        ws_logic.cell(row=start_row+1, column=4, value="If NO")
        for col in range(1, 5):
            ws_logic.cell(row=start_row+1, column=col).fill = alt_row_fill
            ws_logic.cell(row=start_row+1, column=col).font = Font(bold=True)
            ws_logic.cell(row=start_row+1, column=col).border = thin_border
        
        for i, (ref, question, yes, no) in enumerate(questions):
            row = start_row + 2 + i
            ws_logic.cell(row=row, column=1, value=ref).border = thin_border
            ws_logic.cell(row=row, column=2, value=question).border = thin_border
            ws_logic.cell(row=row, column=3, value=yes).border = thin_border
            ws_logic.cell(row=row, column=4, value=no).border = thin_border
            for col in range(1, 5):
                ws_logic.cell(row=row, column=col).alignment = wrap_alignment
    
    # Task definitions box
    task_start = 44
    ws_logic[f'A{task_start}'] = "TASK TYPE DEFINITIONS"
    ws_logic[f'A{task_start}'].font = Font(bold=True, size=12, color=DEEP_TEAL)
    
    task_defs = [
        ("On-Condition (CBM)", "Detects potential failures by measuring degradation. Requires identifiable P-F interval and practical inspection method."),
        ("Scheduled Restoration (TBR)", "Restores capability of an item to specified standard at fixed intervals. Requires age-related failure pattern."),
        ("Scheduled Discard (TBD)", "Discards item at fixed intervals regardless of condition. Requires age-related failure pattern."),
        ("Failure-Finding (FF)", "Checks hidden function at intervals to discover if it has failed. Interval based on risk tolerance."),
        ("Run to Failure (RTF)", "No scheduled maintenance. Repair or replace only after failure occurs."),
        ("Redesign/One-Time Change", "Modify equipment, change materials, improve procedures, or add training to eliminate or reduce consequences."),
    ]
    
    for i, (task, defn) in enumerate(task_defs):
        row = task_start + 1 + i
        ws_logic.cell(row=row, column=1, value=task)
        ws_logic.cell(row=row, column=1).font = Font(bold=True)
        ws_logic.cell(row=row, column=2, value=defn)
        ws_logic.merge_cells(f'B{row}:F{row}')
    
    set_column_widths(ws_logic, {'A': 12, 'B': 60, 'C': 25, 'D': 40, 'E': 15, 'F': 15})
    add_footer(ws_logic, 55, 6)
    
    # ----- Sheet 3: Task Selection Worksheet -----
    ws_task = wb.create_sheet("Task Selection Worksheet")
    
    task_headers = [
        "FMEA Ref", "Failure Mode", "Consequence\n(H/S/E/O/N)", 
        "Q1", "Q2", "Q3", "Q4", "Q5", "Q6",
        "H1/S1/O1/N1", "H2/S2/O2/N2", "H3/S3/O3/N3", "H4/S4/O4/N4", "H5",
        "Selected Task Type", "Task Description", "Interval", "Basis for Decision"
    ]
    
    for col, header in enumerate(task_headers, 1):
        ws_task.cell(row=1, column=col, value=header)
    
    apply_header_style(ws_task, row=1, end_col=len(task_headers))
    
    # Example entries
    example_tasks = [
        ["1.1", "Impeller wear (P-101)", "O", "Y", "-", "-", "N", "N", "Y", "Y", "-", "-", "-", "-", 
         "On-Condition", "Vibration monitoring - overall velocity trending", "Monthly", "Clear P-F interval (~3 months), practical measurement method"],
        ["1.2", "Mechanical seal failure (P-101)", "O", "Y", "-", "-", "N", "N", "Y", "Y", "-", "-", "-", "-",
         "On-Condition", "Visual inspection for seal leakage", "Daily (operator rounds)", "Detectable leak before bearing damage"],
        ["3.1", "PSV spring fatigue (P-101)", "H+S", "N", "Y", "N", "-", "-", "-", "N", "Y", "-", "-", "-",
         "Scheduled Restoration", "PSV overhaul and recertification", "5 years", "Regulatory requirement, age-related wear mechanism"],
    ]
    
    for row_idx, row_data in enumerate(example_tasks, 2):
        for col_idx, value in enumerate(row_data, 1):
            ws_task.cell(row=row_idx, column=col_idx, value=value)
    
    # Empty rows
    for row in range(len(example_tasks) + 2, 52):
        for col in range(1, len(task_headers) + 1):
            ws_task.cell(row=row, column=col, value="")
    
    apply_alternating_rows(ws_task, start_row=2, end_row=51, end_col=len(task_headers))
    
    # Data validations
    dv_yn = DataValidation(type="list", formula1='"Y,N,-"', allow_blank=True)
    dv_yn.error = "Enter Y (Yes), N (No), or - (Not Applicable)"
    ws_task.add_data_validation(dv_yn)
    dv_yn.add('D2:N100')
    
    dv_conseq = DataValidation(type="list", formula1='"H,H+S,H+E,S,E,O,N"', allow_blank=True)
    dv_conseq.error = "Select consequence category"
    ws_task.add_data_validation(dv_conseq)
    dv_conseq.add('C2:C100')
    
    dv_task = DataValidation(type="list", formula1='"On-Condition,Scheduled Restoration,Scheduled Discard,Failure-Finding,Combination,Run to Failure,Redesign"', allow_blank=True)
    ws_task.add_data_validation(dv_task)
    dv_task.add('O2:O100')
    
    set_column_widths(ws_task, {
        'A': 10, 'B': 30, 'C': 14, 'D': 5, 'E': 5, 'F': 5, 'G': 5, 'H': 5, 'I': 5,
        'J': 14, 'K': 14, 'L': 14, 'M': 14, 'N': 5, 'O': 20, 'P': 35, 'Q': 12, 'R': 40
    })
    ws_task.freeze_panes = 'D2'
    
    add_footer(ws_task, 55, len(task_headers))
    
    # Save
    wb.save('/Users/villanelle/.openclaw/workspace/projects/reliability-hq/products/RCM-Decision-Diagram-Worksheet.xlsx')
    print("✓ Created: RCM-Decision-Diagram-Worksheet.xlsx")

# ============================================================================
# RUN ALL
# ============================================================================
if __name__ == "__main__":
    print("Creating Reliability HQ Digital Products...")
    print("-" * 50)
    create_fmea_template()
    create_criticality_calculator()
    create_decision_diagram()
    print("-" * 50)
    print("All Excel products created successfully!")
