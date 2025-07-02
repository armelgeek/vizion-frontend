`````````instructions
````````instructions
``instructions

# Copilot Instructions: Générer une Simple Admin Page

> **Avant de générer une page ou un composant pour une nouvelle fonctionnalité admin, vérifie dans `components/ui/` si un design ou composant correspondant existe déjà pour illustrer ou structurer la fonctionnalité.  
> Si un composant adapté existe, utilise-le ou référence-le dans la page ou le formulaire généré.  
> Si aucun composant n’existe, utilise le composant générique prévu (`SimpleAdminPage` ou autre selon le contexte) et signale qu’aucun design spécifique n'a été trouvé dans `components/ui/`.**

**Tous les endpoints d’API doivent être ajoutés dans `shared/config/api.ts` sous la clé appropriée (`API_ENDPOINTS`).**

**Tous les composants générés doivent commencer par la directive `"use client"` pour être explicitement des composants client React.**

**Jamais d'appel direct à `fetch` ou à une API dans un composant React.**
- Utilise toujours l’architecture du projet : crée un service (`features/[entity]/[entity].service.ts`) qui hérite de `BaseService` (l'implémentation des appels API est dans `lib/base-service.ts`), puis un hook (`features/[entity]/hooks/use-[entity].ts`) qui encapsule l’appel API avec React Query (`useQuery` ou `useMutation`).
- Les composants ne doivent consommer que les hooks personnalisés, jamais `fetch` ou `axios` directement.
- Respecte la séparation : service = accès API (via `BaseService`), hook = gestion de la donnée/caching, composant = affichage.

**Après chaque génération de fichier, vérifie automatiquement s’il y a des erreurs de compilation ou de typage dans les fichiers générés. Si des erreurs sont détectées, corrige-les avant de considérer la tâche comme terminée.**

**Ne génère pas de commentaires dans le code, sauf si c'est strictement nécessaire pour la compréhension d'un algorithme complexe.**

Pour toute nouvelle entité admin, effectue les étapes suivantes :

1. **Schéma et type**
   - Crée le fichier `features/[entity]/[entity].schema.ts`
   - Exporte un schéma Zod et le type TypeScript correspondant :

```ts
import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const [Entity]Schema = z.object({
  // ...fields...
});

export type [Entity] = z.infer<typeof [Entity]Schema>;
```

2. **Données mock et service mock**
   - Crée le fichier `features/[entity]/[entity].mock.ts`
   - Exporte un tableau de données mock et un service mock :

```ts
import { [Entity] } from './[entity].schema';
import { createMockService } from '@/lib/admin-generator';

export const mock[Entity]s: [Entity][] = [ /* ... */ ];
export const [entity]Service = createMockService(mock[Entity

3. **Service API réel**
   - Crée le fichier `features/[entity]/[entity].service.ts` :

```ts
import BaseService from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

export const [entity]Service = new BaseService<[Entity]>(
  http.private,
  API_ENDPOINTS.[entity]
);
```

4. **Hook de query**
   - Crée le fichier `features/[entity]/hooks/use-[entity].ts` :

```ts
import { useQuery } from '@tanstack/react-query';
import { [entity]Service } from '../[entity].service';

export function use[Entity]() {
  return useQuery({
    queryKey: ['[entity]s'],
    queryFn: () => [entity]Service.list(),
  });
}
```

5. **Configuration admin**
   - Crée le fichier `features/[entity]/[entity].admin-config.ts`
   - Selon le type de service utilisé, choisis l’exemple adapté :

**a) Avec mock :**

```ts
import { createAdminEntity } from '@/lib/admin-generator';
import { [Entity]Schema } from './[entity].schema';
import { [entity]Service } from './[entity].mock';

export const [Entity]AdminConfig = createAdminEntity('[Nom]', [Entity]Schema, {
  description: 'Gérez vos ...',
  icon: '🏷️',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: {
    fetchItems: [entity]Service.fetchItems,
    createItem: [entity]Service.createItem,
    updateItem: [entity]Service.updateItem,
    deleteItem: [entity]Service.deleteItem,
  },
  queryKey: ['[entity]s'],
});
```

**b) Avec API réelle :**

```ts
import { createAdminEntity } from '@/lib/admin-generator';
import { [Entity]Schema } from './[entity].schema';
import { [entity]Service } from './[entity].service';

export const [Entity]AdminConfig = createAdminEntity('[Nom]', [Entity]Schema, {
  description: 'Gérez vos ...',
  icon: '🏷️',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: {
    fetchItems: [entity]Service.list,
    createItem: [entity]Service.create,
    updateItem: [entity]Service.update,
    deleteItem: [entity]Service.delete,
  },
  queryKey: ['[entity]s'],
});
```

6. **Page d’admin**
   - Crée le fichier `app/(admin)/admin/[entity]/page.tsx`
   - Utilise :

```tsx
import { [Entity]Schema } from '@/features/[entity]/[entity].schema';
import { [Entity]AdminConfig } from '@/features/[entity]/[entity].admin-config';
import { SimpleAdminPage } from '@/shared/components/atoms/ui/simple-admin-page';

export default function [Entity]AdminPage() {
  return (
    <SimpleAdminPage
      config={[Entity]AdminConfig}
      schema={[Entity]Schema}
    />
  );
}
```

7. **Vérifie que le composant `SimpleAdminPage` est bien utilisé**  
   - Import depuis `@/shared/components/atoms/ui/simple-admin-page`.

**À chaque fois qu’une nouvelle fonctionnalité admin est générée, ajoute automatiquement une entrée correspondante dans le menu sidebar admin.**
- La liste des menus sidebar se trouve dans `shared/lib/constants/app.constant.ts`.
- L’intitulé, l’icône et le chemin doivent être cohérents avec la nouvelle entité.
- Cette étape est obligatoire pour toute nouvelle page ou module admin.

> Remplace `[entity]`, `[Entity]`, `[Nom]` par le nom de ton entité (ex : `category`, `Category`, `Catégorie`).

**Jamais :**
- d’appel direct à `fetch` ou `axios` dans un composant React
- d’appel API dans un composant sans passer par un hook custom et un service
- d’implémentation d’appel API ailleurs que dans un service héritant de `BaseService`

**Toujours :**
- Service = accès API (via `BaseService`)
- Hook = gestion de la donnée/caching (React Query)
- Composant = affichage, consomme le hook

Cette structure garantit une admin page modulaire, claire, réutilisable et maintenable.

---

## 🏗️ Architecture du Projet

### Structure des Dossiers (extrait réel du projet)

```
/ (racine)
├── app/
│   ├── (admin)/
│   │   └── admin/
│   │       └── categories/
│   │           └── page.tsx
│   ├── (root)/
│   └── (ui)/
├── components/
│   ├── debug/
│   ├── navigation/
│   └── ui/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── providers/
│   └── category/
│       ├── category.admin-config.ts
│       ├── category.mock.ts
│       └── category.schema.ts
├── hooks/
├── lib/
├── public/
├── scripts/
├── shared/
│   ├── components/
│   ├── domain/
│   ├── hooks/
│   ├── layout/
│   ├── lib/
│   ├── providers/
│   └── styles/
```

> Cette structure réelle doit être respectée pour toute nouvelle fonctionnalité ou page d’admin.

---

### 1. Structure d'une Fonctionnalité (adaptée à ce projet)

Chaque fonctionnalité doit être organisée dans `features/[nom-fonctionnalite]/` :

```ts
// features/category/category.schema.ts
import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'category.errors.name.required'),
  description: z.string().optional(),
});

// features/category/category.types.ts
export type Category = z.infer<typeof categorySchema>;

// features/category/category.config.ts
export const categoryKeys = createQueryKeys({
  entity: 'category'
});

// features/category/index.ts
export { useCategory } from './hooks/use-category';
export { useCategoryActions } from './hooks/use-category-actions';
export type { Category } from './category.types';
```

### 2. Hooks Personnalisés

#### Hook de Query (Lecture)
```ts
// features/category/hooks/use-category.ts
export const useCategory = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: () => categoryService.list({ page: 1, limit: 10 }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: categoryKeys.lists(),
      refetchType: 'all'
    });
  };

  return { ...query, invalidate };
};
```

#### Hook d'Actions (Mutations)
```ts
// features/category/hooks/use-category-actions.ts
export const useCategoryActions = () => {
  const mutations = useMutations<Category>({
    service: categoryService,
    queryKeys: categoryKeys,
    successMessages: {
      create: t('admin.category.create.success')
    }
  });

  return {
    create: mutations.create,
    update: mutations.modify,
    isUpdating: mutations.isModifing,
    invalidate: mutations.invalidate
  };
};
```

### 3. Services API

#### Configuration des Endpoints
```ts
// lib/api-endpoints.ts
export const API_ENDPOINTS = {
  category: {
    base: `${prefix}/v1/category`,
    create: `${prefix}/v1/category`,
    list: (qs: string) => `${prefix}/v1/category?${qs}`,
    detail: (id: string) => `${prefix}/v1/category/${id}`,
    update: (id: string) => `${prefix}/v1/category/${id}`,
    delete: (id: string) => `${prefix}/v1/category/${id}`
  }
} as const;
```

#### Service HTTP
```ts
// features/category/category.service.ts
import BaseService from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

export const categoryService = new BaseService<Category>(
  http.private,
  API_ENDPOINTS.category
);
```

> Adapte les chemins et noms de fichiers/types à la convention de ce projet (dossier `features/`, services dans `lib/` ou `features/[feature]/`, hooks dans `features/[feature]/hooks/`, etc.).

### 4. Composants & Formulaires

#### Structure d'un Composant
```ts
// Suivre cet ordre dans les composants :
export function CategoryForm({ onSubmit }: { onSubmit: (data: Category) => void }) {
  // 1. État local
  const [loading, setLoading] = useState(false);
  
  // 2. Hooks personnalisés
  const { t } = useTranslation();
  const { data, isLoading } = useCategory();
  
  // 3. Effets
  useEffect(() => {
    // logique d'effet
  }, []);

  // 4. Gestionnaires d'événements
  const handleSubmit = (data: Category) => {
    onSubmit(data);
  };

  // 5. JSX
  return (
    <form onSubmit={handleSubmit}>
      {/* Contenu du formulaire */}
    </form>
  );
}
```

#### Formulaires avec React Hook Form + Zod
```ts
const { control, handleSubmit, reset } = useForm<Category>({
  defaultValues: {
    name: '',
    description: ''
  },
  resolver: zodResolver(categorySchema),
  mode: 'onChange'
});

const onSubmit = async (data: Category) => {
  await create(data);
  reset();
};

// Utiliser les composants contrôlés
<ControlledTextInput
  name="name"
  control={control}
  placeholder={t('admin.category.form.placeholders.name')}
/>
```

### 5. Gestion d'État

#### État Local avec Zustand
```ts
// features/category/category.store.ts
interface CategoryState {
  currentCategory: Category | null;
  setCurrentCategory: (category: Category) => void;
  clearCurrentCategory: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  currentCategory: null,
  setCurrentCategory: (category) => set({ currentCategory: category }),
  clearCurrentCategory: () => set({ currentCategory: null })
}));
```

#### Mutations avec Invalidation Automatique
```ts
// lib/react-query/mutation.ts
export function useMutations<T extends HasId, P>(config: MutationConfig<T, P>) {
  const handleSuccess = (type: 'create' | 'update' | 'delete', data: T) => {
    // Invalidation automatique des queries
    queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    // ...autre logique métier...
  };
}
```

---

## 📝 Bonnes Pratiques

### 1. Conventions de Nommage
- **Fichiers** : kebab-case (`user-avatar.tsx`)
- **Composants** : PascalCase (`UserAvatar`)
- **Hooks** : camelCase avec préfixe `use` (`useCategory`)
- **Types** : PascalCase (`CategoryPayload`)
- **Variables** : camelCase (`isLoading`)

### 2. Structure des Fichiers
- Un composant par fichier
- Export par défaut pour les composants principaux
- Export nommé pour les utilitaires

### 3. Commentaires dans le Code
- **Éviter les commentaires** dans le code de production
- Le code doit être auto-documenté avec des noms explicites
- Privilégier des noms de variables et fonctions clairs
- Les seuls commentaires acceptés :
  - JSDoc pour les fonctions publiques/exportées
  - Commentaires temporaires pendant le développement (à supprimer avant commit)
  - Commentaires explicatifs pour des algorithmes complexes (rare)

```ts
// ❌ Éviter
const d = new Date(); // Date actuelle
const u = users.filter(u => u.active); // Filtrer les utilisateurs actifs

// ✅ Préférer
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);
```

### 4. Gestion des Erreurs
```ts
// Dans les hooks
const { mutate: createCategory, isPending, error } = useMutation({
  mutationFn: categoryService.create,
  onSuccess: () => {
    toast.success(t('success.message'));
  },
  onError: (error) => {
    toast.error(`Erreur: ${error.message}`);
  }
});
```

### 5. Performance
- Utilisez `useMemo` pour les calculs coûteux
- Utilisez `useCallback` pour les fonctions passées en props
- Préférez la pagination pour les listes importantes

### 6. Accessibilité
- Toujours inclure `aria-label` sur les éléments interactifs
- Utiliser les rôles ARIA appropriés
- Gérer le focus keyboard

## 🚀 Checklist pour Nouvelle Fonctionnalité

### Avant de Commencer
- [ ] Créer le dossier `features/[feature]/`
- [ ] Définir les schémas Zod dans `category.schema.ts`
- [ ] Créer les types TypeScript dans `category.types.ts`
- [ ] Configurer les query keys dans `category.config.ts`

### Développement
- [ ] Créer le service API
- [ ] Implémenter les hooks (query + mutations)
- [ ] Développer les composants UI
- [ ] Configurer la navigation/routing

### Tests & Finalisation
- [ ] Tester les formulaires (validation, soumission)
- [ ] Vérifier la gestion d'erreur
- [ ] Valider l'accessibilité
- [ ] Optimiser les performances
- [ ] Documenter les APIs publiques

## 📚 Ressources

- [Documentation React Query](https://tanstack.com/query/latest)
- [Documentation Zod](https://zod.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Documentation Radix UI](https://www.radix-ui.com/)
- [Guide Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

## 🤖 Instructions pour l'IA

Quand tu développes une nouvelle fonctionnalité :

1. **Analyse** d'abord la structure existante similaire
2. **Suis** l'architecture modulaire décrite
3. **Utilise** les patterns établis (hooks, services, composants)
4. **Respecte** les conventions de nommage
5. **Pense** à l'invalidation des caches React Query
6. **Gère** les états de chargement et d'erreur
7. **Assure-toi** de l'accessibilité des composants

**Exemple de workflow** :
1. Créer les types et schémas
2. Implémenter le service API
3. Créer les hooks (query + actions)
4. Développer les composants UI
5. Intégrer dans les pages
6. Tester et optimiser

---

### 🔗 Utilisation d’une vraie API pour l’admin

Si tu utilises une vraie API (et non un mock) pour l’admin :

1. **Service API réel**
   - Crée le fichier `features/[entity]/[entity].service.ts` :

```ts
import BaseService from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

export const [entity]Service = new BaseService<[Entity]>(
  http.private,
  API_ENDPOINTS.[entity]
);
```

2. **Configuration admin**
   - Dans `features/[entity]/[entity].admin-config.ts`, importe le vrai service :

```ts
import { createAdminEntity } from '@/lib/admin-generator';
import { [Entity]Schema } from './[entity].schema';
import { [entity]Service } from './[entity].service';

export const [Entity]AdminConfig = createAdminEntity('[Nom]', [Entity]Schema, {
  description: 'Gérez vos ...',
  icon: '🏷️',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: {
    fetchItems: [entity]Service.list,
    createItem: [entity]Service.create,
    updateItem: [entity]Service.update,
    deleteItem: [entity]Service.delete,
  },
  queryKey: ['[entity]s'],
});
```

3. **Page d’admin**
   - Rien ne change, tu utilises toujours le composant `SimpleAdminPage` avec la config ci-dessus.

> Remplace `[entity]`, `[Entity]`, `[Nom]` par le nom de ton entité (ex : `category`, `Category`, `Catégorie`).
> Les méthodes à fournir dans `services` sont : `list`, `create`, `update`, `delete` (ou leurs équivalents selon ton service).

---

## Gestion avancée des validations et messages d’erreur

- **Support des messages d’erreur personnalisés** dans le schéma Zod :
  - Utilisez la syntaxe : `z.string().min(1, 'Ce champ est requis')` ou `z.number().min(0, 'Le prix doit être positif')`.
  - Les messages d’erreur sont automatiquement affichés dans les formulaires admin.

- **Affichage automatique des erreurs de validation** dans les formulaires :
  - Les erreurs sont affichées sous chaque champ concerné.
  - Le focus est automatiquement mis sur le premier champ en erreur lors de la soumission.

- **Gestion centralisée des messages d’erreur API** :
  - Toute erreur serveur (validation, droits, etc.) est affichée via un toast ou une alerte globale.
  - Les hooks et services doivent propager les erreurs pour affichage global (ex : `toast.error(error.message)`).

**Exemple :**
```ts
const schema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  price: z.number().min(0, 'Le prix doit être positif'),
});
```

---

## Widgets relation pour les champs relation admin

Pour les champs de type relation dans un schéma Zod, tu peux choisir dynamiquement le rendu du widget via la clé `display.widget` :

- `select` : menu déroulant natif stylisé (single ou multi)
- `tag` : badges cliquables (single : choix unique, multi : toggle)
- `radio` : radio group stylisé (single) ou checkbox group stylisé (multi)

**Exemple :**
```ts
routeId: createField.relation('routes', 'routeLabel', false, {
  label: 'Route',
  display: { showInForm: true, widget: 'radio' }
})
```

Le widget est choisi dynamiquement selon la valeur de `display.widget` dans le schéma Zod.
Accessibilité, focus clavier et feedback visuel sont gérés automatiquement dans le composant RelationField.

---

## Actions personnalisées dans la toolbar et bulk du DataTable admin

Pour ajouter des actions personnalisées dans la barre d’outils (toolbar) du tableau admin, la configuration admin accepte une clé optionnelle :

- `ui.toolbarActions?: React.ReactNode | ((selectedRows: T[]) => React.ReactNode)`

**Utilisation :**
- Placez vos boutons ou actions contextuelles dans `ui.toolbarActions` de la config admin :
  ```ts
  ui: {
    toolbarActions: (selectedRows) => (
      <>
        <Button onClick={...}>Exporter</Button>
        <MyCustomAction selected={selectedRows} />
      </>
    )
  }
  ```
- Si vous fournissez une fonction, elle reçoit le tableau des lignes sélectionnées (pour actions bulk/contextuelles).

**Pour les actions bulk natives** (supprimer, exporter, etc.), continuez d’utiliser la config `actions.bulk` et/ou `bulkActions`.

---

## Actions bulk natives et personnalisées

Pour gérer les actions bulk (actions sur plusieurs lignes sélectionnées) dans l’admin :

- **Actions bulk natives** (supprimer, exporter, etc.) :
  - Activez-les via la clé `actions.bulk: true` dans la config admin.
  - Pour la suppression groupée, activez aussi `actions.delete: true`.
  - Vous pouvez personnaliser les actions bulk natives via la clé `bulkActions` :
    ```ts
    bulkActions: [
      {
        key: 'export',
        label: 'Exporter',
        icon: <DownloadIcon />, // optionnel
        onClick: async (ids) => { ... },
        variant: 'default' // ou 'destructive', etc.
      },
      // ...
    ]
    ```
  - Les actions bulk natives s’affichent automatiquement dans la barre d’actions contextuelle quand des lignes sont sélectionnées.

- **Actions personnalisées dans la toolbar** :
  - Utilisez `ui.toolbarActions` pour ajouter des boutons ou actions contextuelles au-dessus du tableau (voir section précédente).
  - Ces actions peuvent aussi exploiter les lignes sélectionnées si besoin.

---

## Formatage et affichage avancé des champs (prix, devise, etc.)

Pour personnaliser l’affichage d’un champ (ex : prix, devise, format custom), chaque champ de la config ou du schéma Zod accepte dans `display` :

- `prefix` : préfixe affiché avant la valeur (ex : `€ `, `$`, etc.)
- `suffix` : suffixe affiché après la valeur (ex : ` €`, ` km`, etc.)
- `format` : fonction de formatage custom `(value) => string` (**si défini, il écrase tout le formattage par défaut, y compris prefix/suffix**)

**Exemple :**
```ts
{
  key: 'price',
  label: 'Prix',
  type: 'number',
  display: {
    prefix: '€ ',
    // ou suffix: ' €'
    // ou format: (v) => v ? `€ ${Number(v).toFixed(2)}` : '' // prioritaire sur prefix/suffix
  }
}
```

- Si `format` est défini, il est utilisé pour afficher la valeur dans le tableau admin (aucun prefix/suffix n’est appliqué).
- Sinon, le préfixe et/ou le suffixe sont ajoutés autour de la valeur.
- Fonctionne pour tous les champs (tableau, formulaire, etc.).

---

## hook générique useEntityQuery

- **Tout nouvel endpoint doit obligatoirement être ajouté dans le registre centralisé `API_ENDPOINTS` (`shared/config/api.ts`) sous la clé `dashboard` ou une clé dédiée.**
- N’utilise jamais de string littérale d’URL dans les services ou hooks : importe toujours l’URL depuis `API_ENDPOINTS.dashboard` ou une clé dédiée.
- Pour toute nouvelle feature dashboard/statistiques, crée un service qui hérite de `BaseService` et utilise le hook générique `useEntityQuery` pour la gestion des requêtes (lecture, params, mutations CRUD si besoin).
- **Pattern recommandé :**
  1. Ajoute l’endpoint dans `API_ENDPOINTS.dashboard` :
     ```ts
     export const API_ENDPOINTS = {
       // ...existing code...
       dashboard: {
         base: '/api/admin/dashboard',
         bookingDistribution: '/api/admin/dashboard/booking-distribution',
         // autres endpoints dashboard...
       }
     }
     ```
  2. Crée le service :
     ```ts
     import BaseService from '@/shared/lib/services/base-service';
     import { API_ENDPOINTS } from '@/shared/config/api';
     export const bookingDistributionService = new BaseService(API_ENDPOINTS.dashboard.bookingDistribution);
     ```
  3. Utilise le hook générique :
     ```ts
     import { useEntityQuery } from '@/shared/hooks/use-entity-query';
     export function useBookingDistribution(params?: Record<string, unknown>) {
       return useEntityQuery({
         service: bookingDistributionService,
         queryKey: ['booking-distribution'],
         params,
       });
     }
     ```
- **Toujours utiliser `useEntityQuery` pour la gestion des données côté client (lecture, params dynamiques, mutations CRUD si besoin) pour toute nouvelle feature nécessitant un accès API factorisé (dashboard, statistiques, entités, etc.).**
- Ce pattern s’applique aussi bien pour les endpoints publics que privés, et pour toute ressource paginée ou filtrable.
- Pour les mutations (create, update, delete), utilisez le service passé à `useEntityQuery` ou un hook compagnon (ex : `useEntityMutations` si existant) pour garantir la cohérence et la factorisation.
- Les noms de `queryKey` doivent être cohérents et idéalement centralisés dans un fichier de config (ex : `entityKeys`).
- Toute logique de transformation/adaptation des données (mapping, formatage, adaptation) doit être faite dans le hook ou un utilitaire dédié, jamais dans le composant React.

---

- **Toujours utiliser un composant `Skeleton` (ou équivalent) pour l’affichage du chargement dans les pages et composants admin/factorisés.**
  - Le Skeleton doit être visible tant que les données sont en cours de chargement (`isLoading`, `isFetching`, etc.).
  - Ne jamais afficher un écran vide ou un simple "Loading..." : le Skeleton doit donner un feedback visuel cohérent avec l’UI admin.
