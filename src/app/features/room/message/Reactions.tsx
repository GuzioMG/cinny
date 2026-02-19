import React, { MouseEventHandler, useCallback, useState } from 'react';
import {
  Box,
  Modal,
  Overlay,
  OverlayBackdrop,
  OverlayCenter,
  Text,
  Tooltip,
  TooltipProvider,
  as,
  toRem,
  RectCords,
  PopOut,
} from 'folds';
import classNames from 'classnames';
import { Room } from 'matrix-js-sdk';
import { type Relations } from 'matrix-js-sdk/lib/models/relations';
import FocusTrap from 'focus-trap-react';
import { useMatrixClient } from '../../../hooks/useMatrixClient';
import { factoryEventSentBy } from '../../../utils/matrix';
import { AddReaction, Reaction, ReactionTooltipMsg } from '../../../components/message';
import { EmojiBoard } from '../../../components/emoji-board';
import { useRelations } from '../../../hooks/useRelations';
import * as css from './styles.css';
import { ReactionViewer } from '../reaction-viewer';
import { stopPropagation } from '../../../utils/keyboard';
import { useMediaAuthentication } from '../../../hooks/useMediaAuthentication';

export type ReactionsProps = {
  room: Room;
  mEventId: string;
  canSendReaction?: boolean;
  relations: Relations;
  imagePackRooms: Room[];
  onReactionToggle: (targetEventId: string, key: string, shortcode?: string) => void;
};
export const Reactions = as<'div', ReactionsProps>(
  (
    {
      className,
      room,
      relations,
      mEventId,
      canSendReaction,
      imagePackRooms,
      onReactionToggle,
      ...props
    },
    ref
  ) => {
    const mx = useMatrixClient();
    const useAuthentication = useMediaAuthentication();
    const [viewer, setViewer] = useState<boolean | string>(false);
    const [emojiBoardAnchor, setEmojiBoardAnchor] = useState<RectCords>();
    const myUserId = mx.getUserId();
    const reactions = useRelations(
      relations,
      useCallback((rel) => [...(rel.getSortedAnnotationsByKey() ?? [])], [])
    );

    const handleViewReaction: MouseEventHandler<HTMLButtonElement> = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      const key = evt.currentTarget.getAttribute('data-reaction-key');
      if (!key) setViewer(true);
      else setViewer(key);
    };
    const handleOpenEmojiBoard: MouseEventHandler<HTMLButtonElement> = (evt) => {
      const target = evt.currentTarget;
      setEmojiBoardAnchor(target.getBoundingClientRect());
    };

    return (
      <Box
        className={classNames(css.ReactionsContainer, className)}
        gap="200"
        wrap="Wrap"
        {...props}
        ref={ref}
      >
        {reactions.map(([key, events]) => {
          const rEvents = Array.from(events);
          if (rEvents.length === 0 || typeof key !== 'string') return null;
          const myREvent = myUserId ? rEvents.find(factoryEventSentBy(myUserId)) : undefined;
          const isPressed = !!myREvent?.getRelation();

          return (
            <TooltipProvider
              key={key}
              position="Top"
              tooltip={
                <Tooltip style={{ maxWidth: toRem(200) }}>
                  <Text className={css.ReactionsTooltipText} size="T300">
                    <ReactionTooltipMsg room={room} reaction={key} events={rEvents} />
                  </Text>
                </Tooltip>
              }
            >
              {(targetRef) => (
                <Reaction
                  ref={targetRef}
                  data-reaction-key={key}
                  aria-pressed={isPressed}
                  key={key}
                  mx={mx}
                  reaction={key}
                  count={events.size}
                  onClick={canSendReaction ? () => onReactionToggle(mEventId, key) : undefined}
                  onContextMenu={handleViewReaction}
                  aria-disabled={!canSendReaction}
                  useAuthentication={useAuthentication}
                />
              )}
            </TooltipProvider>
          );
        })}
        {reactions.length > 0 && (
          <Overlay
            onContextMenu={(evt: any) => {
              evt.stopPropagation();
            }}
            open={!!viewer}
            backdrop={<OverlayBackdrop />}
          >
            <OverlayCenter>
              <FocusTrap
                focusTrapOptions={{
                  initialFocus: false,
                  returnFocusOnDeactivate: false,
                  onDeactivate: () => setViewer(false),
                  clickOutsideDeactivates: true,
                  escapeDeactivates: stopPropagation,
                }}
              >
                <Modal variant="Surface" size="300">
                  <ReactionViewer
                    room={room}
                    initialKey={typeof viewer === 'string' ? viewer : undefined}
                    relations={relations}
                    requestClose={() => setViewer(false)}
                  />
                </Modal>
              </FocusTrap>
            </OverlayCenter>
          </Overlay>
        )}
        {canSendReaction && (
          <>
            <AddReaction onClick={handleOpenEmojiBoard} onContextMenu={handleViewReaction} />
            {emojiBoardAnchor && (
              <PopOut
                position="Bottom"
                anchor={emojiBoardAnchor}
                content={
                  <EmojiBoard
                    imagePackRooms={imagePackRooms ?? []}
                    returnFocusOnDeactivate={false}
                    allowTextCustomEmoji
                    onEmojiSelect={(key) => {
                      onReactionToggle(mEventId, key);
                      setEmojiBoardAnchor(undefined);
                    }}
                    onCustomEmojiSelect={(mxc, shortcode) => {
                      onReactionToggle(mEventId, mxc, shortcode);
                      setEmojiBoardAnchor(undefined);
                    }}
                    requestClose={() => {
                      setEmojiBoardAnchor(undefined);
                    }}
                  />
                }
              />
            )}
          </>
        )}
      </Box>
    );
  }
);
