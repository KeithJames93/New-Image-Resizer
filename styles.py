"""
Styles configuration file for Image Resizer & Background Remover
Organized like CSS for easy maintenance and customization
"""

# ============================================================================
# COLOR SCHEME
# ============================================================================

# Background Colors
BG_PRIMARY = "#1a4d2e"      # Dark green background
BG_SECONDARY = "#2d8659"    # Medium green for buttons
BG_HOVER = "#3da372"        # Light green for button hover states
BG_CANVAS = "#1a4d2e"       # Canvas background

# Text Colors
TEXT_PRIMARY = "white"      # Primary text color
TEXT_SECONDARY = "#ffffff"  # Secondary text color

# Button Colors
BUTTON_BG = "#2d8659"
BUTTON_FG = "white"
BUTTON_ACTIVE_BG = "#3da372"
BUTTON_ACTIVE_FG = "white"

# Checkbox Colors
CHECKBOX_BG = "#1a4d2e"
CHECKBOX_FG = "white"
CHECKBOX_ACTIVE_BG = "#1a4d2e"
CHECKBOX_SELECT_COLOR = "#2d8659"

# Entry/Input Colors
ENTRY_BG = "white"
ENTRY_FG = "black"
ENTRY_BORDER = "#2d8659"

# ============================================================================
# TYPOGRAPHY
# ============================================================================

# Font Families
FONT_FAMILY_PRIMARY = "Arial"
FONT_FAMILY_SECONDARY = "Arial"

# Font Sizes
FONT_SIZE_TITLE = 20
FONT_SIZE_HEADING = 11
FONT_SIZE_BODY = 10
FONT_SIZE_BUTTON_LARGE = 12
FONT_SIZE_BUTTON_MEDIUM = 10

# Font Weights
FONT_WEIGHT_NORMAL = "normal"
FONT_WEIGHT_BOLD = "bold"

# Font Styles
FONT_STYLE_NORMAL = "normal"
FONT_STYLE_ITALIC = "italic"

# ============================================================================
# SPACING & LAYOUT
# ============================================================================

# Padding
PADDING_SMALL = 5
PADDING_MEDIUM = 10
PADDING_LARGE = 20

# Margins
MARGIN_SMALL = 5
MARGIN_MEDIUM = 10
MARGIN_LARGE = 20

# Frame Padding
FRAME_PADDING_X = 15
FRAME_PADDING_Y = 10
MAIN_FRAME_PADDING_X = 20
MAIN_FRAME_PADDING_Y = 20

# ============================================================================
# BUTTON STYLES
# ============================================================================

# Button Padding
BUTTON_PADDING_X_SMALL = 15
BUTTON_PADDING_Y_SMALL = 5
BUTTON_PADDING_X_LARGE = 20
BUTTON_PADDING_Y_LARGE = 10

# Button Relief
BUTTON_RELIEF = "raised"
BUTTON_CURSOR = "hand2"

# ============================================================================
# WINDOW SETTINGS
# ============================================================================

WINDOW_WIDTH = 900
WINDOW_HEIGHT = 700
WINDOW_TITLE = "Image Resizer & Background Remover"

# ============================================================================
# IMAGE DISPLAY SETTINGS
# ============================================================================

IMAGE_DISPLAY_MAX_WIDTH = 600
IMAGE_DISPLAY_MAX_HEIGHT = 400

# ============================================================================
# STYLE PRESETS (Ready-to-use style dictionaries)
# ============================================================================

# Title Label Style
TITLE_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_TITLE, FONT_WEIGHT_BOLD),
    "bg": BG_PRIMARY,
    "fg": TEXT_PRIMARY
}

# Heading Label Style
HEADING_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_HEADING, FONT_WEIGHT_BOLD),
    "bg": BG_PRIMARY,
    "fg": TEXT_PRIMARY
}

# Body Label Style
BODY_LABEL_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_BODY, FONT_WEIGHT_NORMAL),
    "bg": BG_PRIMARY,
    "fg": TEXT_PRIMARY
}

# Large Button Style
BUTTON_LARGE_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_BUTTON_LARGE, FONT_WEIGHT_BOLD),
    "bg": BUTTON_BG,
    "fg": BUTTON_FG,
    "activebackground": BUTTON_ACTIVE_BG,
    "activeforeground": BUTTON_ACTIVE_FG,
    "padx": BUTTON_PADDING_X_LARGE,
    "pady": BUTTON_PADDING_Y_LARGE,
    "relief": BUTTON_RELIEF,
    "cursor": BUTTON_CURSOR
}

# Medium Button Style
BUTTON_MEDIUM_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_BUTTON_MEDIUM, FONT_WEIGHT_NORMAL),
    "bg": BUTTON_BG,
    "fg": BUTTON_FG,
    "activebackground": BUTTON_ACTIVE_BG,
    "activeforeground": BUTTON_ACTIVE_FG,
    "padx": BUTTON_PADDING_X_SMALL,
    "pady": BUTTON_PADDING_Y_SMALL,
    "relief": BUTTON_RELIEF,
    "cursor": BUTTON_CURSOR
}

# Frame Style
FRAME_STYLE = {
    "bg": BG_PRIMARY
}

# LabelFrame Style
LABEL_FRAME_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_HEADING, FONT_WEIGHT_BOLD),
    "bg": BG_PRIMARY,
    "fg": TEXT_PRIMARY,
    "padx": FRAME_PADDING_X,
    "pady": FRAME_PADDING_Y
}

# Entry Style
ENTRY_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_BODY),
    "width": 10
}

# Checkbox Style
CHECKBOX_STYLE = {
    "font": (FONT_FAMILY_PRIMARY, FONT_SIZE_BODY),
    "bg": CHECKBOX_BG,
    "fg": CHECKBOX_FG,
    "activebackground": CHECKBOX_ACTIVE_BG,
    "selectcolor": CHECKBOX_SELECT_COLOR
}

# Canvas Style
CANVAS_STYLE = {
    "bg": BG_CANVAS,
    "highlightthickness": 0
}
