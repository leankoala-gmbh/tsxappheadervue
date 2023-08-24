import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'
import ja from './ja.json'
import pt from './pt.json'
import ru from './ru.json'

const languages = {'de': de, 'en': en, 'es': es, 'fr': fr, 'it': it, 'ja': ja, 'pt': pt, 'ru': ru}

export default function () {
  return Object.entries(languages).reduce((acc: any, [key, lang]: [string, any]) => {
    acc[key] = JSON.parse(JSON.stringify(lang))
    return acc
  }, {})
}
