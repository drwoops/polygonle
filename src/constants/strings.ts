export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']

export const GAME_MODE_DAILY = 'Daily'
export const GAME_MODE_UNLIMITED = 'Unlimited'
export const GAME_MODES = [GAME_MODE_DAILY, GAME_MODE_UNLIMITED]
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
export const WORD_NOT_FOUND_MESSAGE = 'Word not found'
export const PATTERN_MUST_MATCH_MESSAGE = 'Must match the pattern'
export const HEXPERT_MODE_ALERT_MESSAGE = 'Entering Hexpert Mode'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const EXPERT_MODE_ALERT_MESSAGE =
  'Expert Mode can only be enabled at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const EXPERT_MODE_DESCRIPTION =
  'All guesses must match the pattern of the shapes. WARNING: this may be incredibly difficult for some puzzles'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New word in'
export const SHARE_TEXT = 'Share'
export const SHARE_FAILURE_TEXT =
  'Unable to share the results. This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.'
export const MIGRATE_BUTTON_TEXT = 'Transfer'
export const MIGRATE_DESCRIPTION_TEXT =
  'Click here to transfer your statistics to a new device.'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser."

export const HARD_MODE_HARD = 'hard'
export const HARD_MODE_NORMAL = 'normal'

export const EXPERT_MODE_EXPERT = 'expert'
export const EXPERT_MODE_NORMAL = 'normal'

export const THEME_DARK = 'dark'
export const THEME_LIGHT = 'light'

export const ALERT_DATA_SETTING = 'setting'
export const ALERT_DATA_GAME_END = 'game_end'
export const ALERT_DATA_GUESS = 'guess'

export const GA_CATEGORY_SETTINGS = 'settings'
export const GA_CATEGORY_MODALS = 'modals'
export const GA_CATEGORY_GAME = 'game'
export const GA_CATEGORY_NAV = 'nav'

// settings
export const GA_ACTION_GAMEMODE_TOGGLE = 'gamemode_toggle'
export const GA_ACTION_DARKMODE_TOGGLE = 'darkmode_toggle'
export const GA_ACTION_HARDMODE_TOGGLE = 'hardmode_toggle'
export const GA_ACTION_EXPERTMODE_TOGGLE = 'expertmode_toggle'
export const GA_ACTION_HIGHCONTRASTMODE_TOGGLE = 'highcontrastmode_toggle'

// modals
export const GA_ACTION_INFOMODAL_OPEN = 'infomodal_open'
export const GA_ACTION_STATSMODAL_OPEN = 'statsmodal_open'
export const GA_ACTION_SUPPORTMODAL_OPEN = 'supportmodal_open'
export const GA_ACTION_MIGRATESTATSMODAL_OPEN = 'migratstatsmodal_open'
export const GA_ACTION_SETTINGMODAL_OPEN = 'settingsmodal_open'

// game
export const GA_ACTION_GUESS = 'guess'
export const GA_ACTION_GAME_FINISH = 'game_finish'

// actions
export const GA_ACTION_REFRESH = 'refresh'
export const GA_ACTION_SHARE = 'share'

// arrowkeys
export const ARROW_LEFT = 'ArrowLeft';
export const ARROW_RIGHT = 'ArrowRight';

